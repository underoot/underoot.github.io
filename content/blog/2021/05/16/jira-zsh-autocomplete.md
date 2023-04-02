---
title: How to save time with ZSH completion system
date: 2021-05-16
---
What you, as software engineer, usually do? Right! You create new gitbranches almost every day, even more than once per day. For example, one of myeveryday patterns following:
1. Look into the board in JIRA;
1. Open one of assigned to me ticket;
1. Move it to "In progress" status if it isn't yet;
1. Copy a key of the ticket;
1. Go to my command line;
1. Create a branch with the same name as the ticket's key, i.e. `feature/EXMPL-1234`.

I have seen many times in different companies attempts of simplifying of that process: <a href="https://en.wikipedia.org/wiki/Bookmarklet" target="_blank">bookmarklets</a> that copy for you current tickets or browser extensions that complement JIRA ticketswith copy button UI etc.

In one day I decided to return to my old idea to learn about <a href="http://zsh.sourceforge.net/Doc/Release/Completion-System.html" target="_blank">ZSH completion system</a> and create completion that will do for me dirty job. And I've created it.

I use <a href="https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases" target="_blank">Git aliases</a> in my Git setup and it works like a charm: you can create shorthands for all of operationsthat you do from console every day when you touch upon Git repositories, i.e.:

```
; ~/.gitconfig
; ...
[alias]
  co = checkout
; ...
```

Using that config you can easily do some everyday routine:

```
~ git co my-awesome-branch
```

Great part of this functionality that autocompletion will works even with your aliases in ZSH. So, imagine that you would like to create alias for start point of your <a href="https://nvie.com/posts/a-successful-git-branching-model" target="_blank">Git flow</a>:

```
; ~/.gitconfig
; ...
[alias]
  co = checkout
  ; Flow Branch
  fb = ! git checkout dev && git pull && git co -b
; ...
```

For our new alias `git fb` we've used alias that starts with exclamation markbecause our command isn't just mapping from value to name of sub-command of git — it is list of commands.

So, imagine that you'd like to have completion for your name of tickets that will be based on your JIRA. It will be useful, right? I'm using <a href="https://www.zsh.org/" target="_blank">ZSH</a> as my shell and I will provide example of realization based on this shell.

ZSH can automatically load functions for you from folders that you specify invariable fpath inside your ZSH initialization scripts, i.e. in `~/.zshrc`:

```
fpath=(~/.zsh $fpath)
```

This instruction tells a shell to check scripts inside `~/.zsh/` folder when corresponding function was called. For example, let's create one of our functions:

```
# ~/.zsh/foo
echo "Initialized"

function foo() {
    echo "Called"
}

foo $@
```

, and also let's update our `~/.zshrc` script to automatically load function when we will call it:

```
# ~/.zshrc
# ...

fpath=(~/.zsh $fpath)
autoload foo
```

Now, when you call `foo` for the first time, you will see message `Initialized`, then — message `Called`. After second time only a message Called will be printed.Thus, this system provide a way to initialize your scripts and automaticallyload definitions based on `fpath`.

But now, let's talk about completion system. In zsh it based on loading systemthat we discussed previously. Let's create simple completion that will be based on command and won't depends on position of parameter. For example, we want to create some custom completion for some existing binary, i.e. `ls`:

```
#compdef ls
#
# ~/.zsh/_ls

params=(One Two)

_describe 'command' params
```

The name of loadable function with underscore at start it is one of requirements of completion system. Other requirement is header of file: `#compdef ...`. This header describe command or other <a href="http://zsh.sourceforge.net/Doc/Release/Completion-System.html" target="_blank">options</a> for your autocomplete function. In this script we initialize array of strings that will be used as our completion items and the last line is one of the ZSH completion functions that provide <a href="https://github.com/zsh-users/zsh-completions/blob/master/zsh-completions-howto.org#writing-simple-completion-functions-using-_describe" target="_blank">the simplest way</a> to describe completion options.

Okay, it is possible to describe completion for executables and it's options. But what about our git aliases that we've created for git. Good news here that ZSH autocompletion scripts that come with Git, at least on OSX, provide to you way to describe completion for your Git aliases that will works as expected: you just need to create `$fpath/_git_<your alias here>` completion script and itwill be invoked with your Git alias.

Using this way of describing completion of git alias I've created script that will do for me a task that I described in the beginning of article:

```
#compdef git-fb

local email=${EMAIL:-example@gmail.com}
local token=${ATLASSIAN_TOKEN}
local jira_host=${$JIRA_HOST:-example.atlassian.com}

local script='
  let result = "";
  process.stdin.on("data", (c) => result += c);
  process.stdin.on("end", () => {
    JSON.parse(result).issues.map((i) => {
      const short = i.fields.summary
        .replace(/\[\w+\]/g, "")
        .replace(/\s/g, "-")
        .toLowerCase()
        .match(/\w+(-\w+){1,2}/)[0]
      console.log(`feature/${i.key}:${i.fields.summary}`)
    });
  });
';

local IFS=$'\n';

params=($(function () {
  local query="assignee=currentuser()%20AND%20status=%22In%20Progress%22";
  local params="jql=${query}&fields=summary"

  curl -s -u "${email}:${token}" \
  "https://${jira_host}/rest/api/3/search\?${params}" \
    | node -e $script
}))

_describe 'command' params
```

This is script that goes to JIRA REST API and asks about all tickets that currently "In progress" and assigned to current user (it is specified by token and email variables) and format using simple Node.js script names of branches from key of tickets and, also, builds completion menu with all available variants for current argument prefix with the corresponding description of all filtered tickets.

Tricky part of this script is Node.js script that is being using to transform received from JIRA REST API endpoint JSON. It cannot be easily done with only UNIX text tools, i.e. sed, grep, awk etc. It will be depends on structure of JSON and will be to fragile. That's why I used Node.js in this part of script. Characteristic of Node.js is it's own callback-style way of describing asynchronous logic, thence, this script looks too complex.

I've rewrote it to Python and after that this part of logic becomes cleaner:

```
#compdef git-fb

local email=${EMAIL:-example@gmail.com}
local token=${ATLASSIAN_TOKEN}
local jira_host=${$JIRA_HOST:-example.atlassian.com}

local script='
import sys,json,re

issues = json.load(sys.stdin)["issues"]
pat = re.compile("\w+(-\w+){1,2}")

for issue in issues:
  short = pat.search(re.sub(r"\s", "-", re.sub(r"\[\w+\]", "", issue["fields"]["summary"])).lower()).group(0)
  key = issue.get("key")
  summary = issue.get("fields").get("summary")
  print(f"feature/{key}-{short}:{summary}")
';

local IFS=$'\n';

params=($(function () {
  local query="assignee=currentuser()%20AND%20status=%22In%20Progress%22";
  local params="jql=${query}&fields=summary"

  curl -s -u "${email}:${token}" \
  "https://${jira_host}/rest/api/3/search\?${params}" \
    | python3 -c $script
}))

_describe 'command' params
```

Also important to note that in this script items of completion formatted using `item:description` pattern. This pattern of item is used by ZSH to format menu of completion with one line per item with description. It looks like that:

```
~ git fb EXMPL- # >TAB
feature/EXMPL-1234 - This is description of ticket
feature/EXMPL-5678 - This is other description of other ticket
```
