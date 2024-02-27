---
title: Fragile semantic patch
date: 2022-07-26
description: Looks like nobody cares about semantic versioning in JavaScript world. Recently I faced with strange behaviour of quite usual command during development of React Native application
---
Every knows that package management is hard job. I think that it even deserved to be put into <a href="https://martinfowler.com/bliki/TwoHardThings.html" target="_blank">the list the most hard things</a> in computer programming alongside with naming and caching.

Recently I faced with strange behaviour of quite usual command during development of React Native application:

```
pod install
```

I received strange and weird error without any additional hints:

```
[!] Invalid `Podfile` file:859: unexpected token at
`info Run CLI with --verbose flag for more details.
```

After hours of debugging I found that ruby script <a href="https://github.com/facebook/react-native/blob/main/template/ios/Podfile#L1" target="_blank">for support of React Native modules</a> under hood calling through API module <a href="https://github.com/react-native-community/cli/tree/main/packages/cli-config" target="_blank">`@react-native-community/cli-config`</a> for gettings all configurations of potentially React Native platorm dependencies.

And everything works good before my decision to update React Native to the next minor. Mentioned configuration library was updated from 8.02 to 8.0.4 version. And guess what happened between two patches? Right! Behaviour of library dramatically changed: validation warnings <a href="https://github.com/react-native-community/cli/pull/1640" target="_blank">become errors</a>. In my particular case problem was slightly different: during `pod install` my dependencies tree consists of only production dependencies, but library going through all dependencies (development and production) and trying to <a href="https://github.com/react-native-community/cli/blob/main/packages/cli-tools/src/findPackageDependencyDir.ts#L86-L101" target="_blank">read directory</a> of every dependency. And before update to the next patch this fragment of code was wrapped with <a href="https://github.com/react-native-community/cli/pull/1640/files#diff-15527507ce82701be03c15bb902686bb8376a1fabb65b2997024f8bc590241feL106-L111" target="_blank">`try...catch`</a>, but after patch this behaviour had been changed.

If you are not caring about semantic versioning, <a href="https://semver.org/#spec-item-8" target="_blank">which said</a>:

> Major version X (X.y.z | X > 0) MUST be incremented if any backwards incompatible changes are introduced to the public API. It MAY also include minor and patch level changes

you are also not caring about your users, even this public library is dependency of you other public library. Please, don't do so!
