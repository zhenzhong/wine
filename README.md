Wiki your codes and Markdown your project each time when you submit your code to svn.

将你的代码变成Wiki，将项目文档Markdown化，并且在每次svn提交时自动生成wiki和文档，是开发者最好的伙伴。

The wine system is a great tool for developers, it would lead your for remember your code wrote for what reason, and give you a wiki for the project.

Wine系统可以让你记住代码为什么而写，也可以自动生成项目wiki，避免无聊的文档工作。

it can be:

* a code mark database of automatic
* simple wiki for your project
* hook the svn and update by svn submit 


* 自动化提取代码注释，并且自动生成文档页面
* 最简约的wiki系统
* 每次svn提交代码时通过svn钩子进行更新，无需人工参与


Wine is a web application base of [k framework](https://www.npmjs.com/package/k) , very simple, fast, mvc framework.

Wine 基于 [k](https://www.npmjs.com/package/k) 框架，简便、快速、MVC框架首选。

## Install

```
npm install wine --save
```

1.&nbsp;create `package.json`

```
{
  "name": "demo",
  "version": "0.0.1",
  "main": "main.js",
  "dependencies": {
    "wine": "latest"
  }
}
```

the dependencies must have the `wine` lib.

2.&nbsp;create database

```
CREATE TABLE `codes` (
     `id` bigint(20) NOT NULL AUTO_INCREMENT,
     `project` varchar(30) NOT NULL,
     `keyword` varchar(30) NOT NULL,
     `filepath` varchar(255) CHARACTER NOT NULL,
     `linenum` int(11) NOT NULL,
     `contents` text,
     PRIMARY KEY (`id`)
   ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
```

3.&nbsp;create `main.js`

```
const wine = require("wine")
const config = {
    'markdown' : process.cwd() + '/md',
    'mysql': {
        host     : 'localhost',
        user     : 'root',
        password : '123456',
        database : 'test'
    },
    'apptitle' : 'Wiki your code'
}
wine(config).listen(3000)
```

`main.js` config the app base: 

* `markdown` is the markdown dir for the `.md` file and the `.ini` file, it can be more pages until become a database.
* `mysql` is database setting, link to the `codes` table above.
* `apptitle` is the app title setting, as your like.
* `listen` can be some port you set.


4.&nbsp;create `md/index.md`

```
## Welcome to Wine system.
```

5.&nbsp;run

```
npm install

...

node main.js
```

then visit [http://localhost:3000](http://localhost:3000)


## Example file

[`.md` file](https://github.com/zhenzhong/wine/blob/master/example/md/test.md) in the config `markdown` dir, is the markdown page template. it is the normal markdown file.

[`.ini` file](https://github.com/zhenzhong/wine/blob/master/example/md/test.ini) in the config `markdown` dir, is the project setting, for example: 

```ini
[project]
name=测试
repository=file:///D:/home/testsvn
username=jake
password=123456

[keyword]
myapi=我的API
test=测试
golang=GO语言
aop=AOP
```

the `project` area is the project name, svn address, svn username and svn password.

the `keyword` area would match the key code in your code file.

Please see [the example](https://github.com/zhenzhong/wine/tree/master/example) for more details.

## Svn hook

Please put the (named test) project hook url [http://localhost:3000/hook/test](http://localhost:3000/hook/test) in the `post-commit` hook.


## License

MIT