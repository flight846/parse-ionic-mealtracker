This is a starter template for a Code Craft course on developing mobile apps with the Ionic Framework.

To use this, either create a new ionic project using the ionic node.js utility, or copy and paste this into an existing Cordova project and download a release of Ionic separately.

### With the Ionic tool:

Add the URL to this github repo as the last parameter to the `ionic start` command:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myApp <INSERT-REPO-URL>
```

Then, to run it, cd into `myApp` and run:

```bash
$ ionic platform add ios
$ ionic build ios
$ ionic emulate ios
```

Substitute ios for android if not on a Mac, but if you can, the ios development toolchain is a lot easier to work with until you need to do anything custom to Android.
