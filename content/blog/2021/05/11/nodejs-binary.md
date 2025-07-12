---
title: How to execute JS like a binary
date: 2021-05-11
description: How to execute JavaScript files like a binary file with usage of Linux custom binary formats
---
There are dozens of binary file formats that supported by operating systems that we use. Binary format is standard that helps operating system to determine howto execute file: read content, load part of them into a memory, extract additional data etc.

How operating system determines how it should execute one or the other binary file? There are several ways to do that: one of that is to look at file extension. For example if you use Windows operating system, you can easily rename any text file to add `.exe`-extension and after that it will be looks like executable file, but, for sure, it cannot be executed because it doesn't follow structure of standard executable file for Windows.

Other way to determine that some file can be executed is read several first bytes of file. This first bytes called <a href="https://en.wikipedia.org/wiki/Magic_number_(programming)#In_files" target="_blank">magic number</a>. For example, in UNIX-like operating system, ELF file format, which is being commonly used, has magic number that consists of hexadecimal number `0x7F` and followed by `ELF` string. More interesting that Java class file and Mach-O file format, which is executable format for MacOS, have the same magic number: `CAFEBABE`. Creator of Java, James Gosling, even <a href="http://radio-weblogs.com/0100490/2003/01/28.html" target="_blank">explained</a> why he chose this magic number and if it has common with Mach-O executable file format.

If you are using UNIX-like operating system, you can easily check content of any files in your system on byte-level, i.e. using program `hexdump`. There is four bytes of executable `hexdump` on my MacBook that were represented by hexadecimal numbers:

```
~ hexdump -n 4 /usr/bin/hexdump
0000000 ca fe ba be
0000004
```

In linux executable file is executed by kernel and format of executable is determinated using either magic numbers or file extension. Built-in module _binfmt_ is responsible for this process. In linux 5.9 you can find <a href="https://git.kernel.org/pub/scm/linux/kernel/git/stable/linux.git/tree/fs?h=linux-5.9.y" target="_blank">seven</a> file formats that kernel supports out of box (take a look at the files with prefix `binfmt` in the list there). And, surprisingly, one of the format is shebang scripts — scripts, that start with `#!` symbol combination. Thus, if you run, using your favorite shell program, script, which has permission to be executed, kernel will decide what to do with your script.

But the most interesting part of this mechanism that you can easily extend itusing <a href="https://www.kernel.org/doc/html/latest/admin-guide/binfmt-misc.html" target="_blank">custom binary formats</a>. By default, your distribution has mounted folder `binfmt_misc` in `/proc/sys/fs`:

```
~ ls /proc/sys/fs/binfmt_misc
register status
```

Using special `register` file you can register your custom executable file format that will be executed by your kernel. For example, we can instruct our kernel to execute javascript files with `.js` extension with `node` program in the future:

```
# echo ":nodejs:E::js::/usr/bin/node:" > \
	/proc/sys/fs/binfmt_misc/register
```

There are list of parameters, which delimited from each other using colons, that we specified in string:
nodejs — name of executable format;

- `E` — specify that we use file extension to determine file format. Other possible value of this parameter is M, which means that we should determinefile format by magic number;
- `js` — value of target extension;
- `/usr/bin/node` — path to executable that will be used for executing of file.

After that file nodejs should appears in the /proc/sys/fs/binfmt_misc folder:

```
~ ls /proc/sys/fs/binfmt_misc
nodejs register status
```

This means that your first custom binary format just have registered. Let's create simple javascript file and execute it:

```
~ echo "console.log('Hello, world!')" > index.js
~ chmod +x ./index.js # Add permission to execute file
~ ./index.js
Hello, world!
```

_Voilà_! Your JavaScript executable file format is ready for using.
