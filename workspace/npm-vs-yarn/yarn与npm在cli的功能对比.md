npm 主要分为三个部分：website（查找、管理已经发布在npm的包，以及对账号、团队的管理）、cli（命令行接口）、registry（注册表）

Yarn 背后依赖是依赖npm的，通过yarn发布的包依旧托管在npm上，yarn 相当于做了一层代理，目的是加速自己的安装服务。yarn在易用性上有不同的理解，cli层面有自己的一套命令，但功能与npm cli 类似。

npm 安装包通过 package-locks 来保证安装的可靠性，package.json 无法完全保证安装正确的包，原因主要是 
1. 可能使用其他包管理工具安装，而安装策略不一定相同
2. semver 的版本更新，npm通过semver来定义包的版本，如果新的semver版本更新，与之相关npm的安装可能导致不通结果
3. 项目依赖项的依赖项发生更新
4. 使用的注册表（registry）不再可用，或者或者运行同一个版本号存在不同的内容

以上都会导致安装包的结果在不同时间变得不在一致。于是package-locks 将会锁定所有依赖项的信息，以树的结构记录起来，一旦存在package-lock.json，将以这个文件做基准来运行。

安装依赖时，对整个依赖数做遍历，安装丢失的依赖项，安装时使用resolved字段指定的文件，如果不可用则使用version的描述来解析

yarn 的安装原理与npm基本类似，根据package.json 和yarn.lock 文件来确定，yarn.lock 的作用同package-lock.json 的作用相同，都是用来保证依赖的准确性。

起初yarn 的推出主要有两点优势，一个是通过本地缓存提高安装速度，另一个就是通过yarn.lock文件来保证项目依赖的可靠性，而npm 5 也增加了package-lock.json 提供相同的作用，npm cli 和yarn 在功能上的差别正越来越小。



| 功能                              | npm  | Yarn | 说明                                                         |
| --------------------------------- | ---- | ---- | ------------------------------------------------------------ |
| 安装依赖（install）               | yes  | yes  | 可选择 离线、静默、指定安装路径、不产生lock文件等安装方式，yarn 默认清洁安装，相当于 npm ci，同时 yarn install 只会安装已经存在package.json 的依赖，如果需要安装新的依赖使用的是add命令。npm 支持从git仓库或者其他远程地址安装，功能更为细致； |
| 审核（audit）                     | yes  | yes  | 检查已安装包的已知问题                                       |
| 清理node_modules                  | no   | yes  | npm 可以手动删除node_modules 再安装实现                      |
| 展示执行文件位置（bin）           | yes  | yes  | 展示工具自身的执行文件地址                                   |
| 缓存（cache）                     | yes  | yes  | 基本相同，yarn可以直接列出所有已缓存的项，并且兼容.npmrc 的缓存配置 |
| 检查（check）                     | no   | yes  | 检查当前 node_modules 中的安装项和package.json 是否匹配      |
| 配置（config）                    | yes  | yes  | 基本相同                                                     |
| 创建（create）                    | yes  | yes  | 安装create-* 工具，并执行工具package.json的bin;npm 则提供功能更加丰富的npx命令，功能覆盖 create 命令 |
| 删除重复数据（dedupe）            | yes  | yes  | yarn 在install 时默认执行                                    |
| 生成lock清单                      | no   | yes  | 根据package.json生成lock的条目                               |
| 全局操作（global）                | yes  | yes  | 在全局环境下的安装、删除、查看等操作, npm 通过-g 标志，yarn则是 yarn global 跟上具体操作 |
| 帮助信息                          | yes  | yes  |                                                              |
| 导入（import）                    | -    | yes  | 根据package-lock.json 或node_modules 生成yarn.lock文件       |
| 包信息（info）                    | yes  | yes  | 列出指定包的相关信息，yarn 更加详细                          |
| 初始化（init）                    | yes  | yes  | 基本相同                                                     |
| 许可证信息（license）             | no   | yes  | 列出所有安装的软件包的许可证信息                             |
| 链接（link）                      | yes  | yes  | 基本相同，并且相互兼容                                       |
| 安装列表（list）                  | yes  | yes  | 列出已经安装的package list，npm ls                           |
| npm登陆                           | yes  | yes  | 本地登陆npm账号，用于发布包等                                |
| npm登出                           | yes  | yes  | 登出npm账号                                                  |
| 过时依赖（outdated）              | yes  | yes  | 列出过时的依赖                                               |
| 拥有者（owner）                   | yes  | yes  | 查看、增加、删除 包的拥有者                                  |
| 打包（pack）                      | yes  | yes  | 将项目打包为tgz                                              |
| 指定版本（policies）              | no   | yes  | 指定项目中始终使用某个yarn版本                               |
| 发布（publish）                   | yes  | yes  | 将包发布到npm的注册表中                                      |
| 移除                              | yes  | yes  | npm 使用uninstall，yarn使用 remove                           |
| 执行（run）                       | yes  | yes  | 较小差异，均执行 script 字段下的命令，支持环境变量和参数，也可执行node_modules 下.bin 中的文件 |
| 标签（tag）                       | yes  | yes  | 基本相同，npm 下为dist-tag                                   |
| 团队管理（tem）                   | yes  | yes  | 管理组织下的团队，增加，删除、修改，以及团队的人员管理，     |
| test                              | yes  | yes  | script 下的test命令                                          |
| 解链（unlink）                    | yes  | yes  | 基本类似，npm文档上没看到unlink 但实际可用                   |
| 更新（upgrade）                   | yes  | yes  | 基本相同，均可用 upgrade（npm: up/update/upgrade），均支持“～”，“^”规则。 |
| 交互式更新（upgrade-interactive） | no   | yes  | 通过交互界面手动选择更新包                                   |
| 版本（version）                   | yes  | yes  | 基本相同，支持版本钩子，支持启用和禁用 同步生成的 git tag    |
| 所有版本（versions）              | no   | yes  | 列出yarn,node.js 和所有依赖的版本                            |
| 安装原因（why）                   | no   | yes  | 列出指定包的安装信息，顾名思义，告诉用户为什么安装这个包     |
| 工作区（workspace）               | yes  | yes  | 基本类似，通过工作区的方式管理各个依赖                       |

以下是与 yarn 对比 npm 额外的 命令：

| 功能                   | 描述                                                         |
| ---------------------- | ------------------------------------------------------------ |
| 访问级别控制（access） | 设置已经发布的包的访问权限等级                               |
| 反馈bugs               | 打开指定包的bugs反馈URL，没有则打开主页                      |
| 清洁安装（ci）         | 常用在自动化的环境，不会改变package.json                     |
| 命令行，Tab 提示       | 手动添加 tab Completion                                      |
| 废弃（deprecate）      | 标记 注册表上的 库为废弃的                                   |
| 打开包文档（docs）     | 别名 home                                                    |
| npm问题排查（doctor）  | 检查自身运行环境                                             |
| 编辑包（edit）         | 直接编辑指定包                                               |
| 执行文件（exec）       | 执行本地或者远程的包，与npx 相似，传参方式不同               |
| 说明（explain）        | 打印出给定项目的依赖链                                       |
| explore                | 在已安装的包下执行 一个 sub shell                            |
| 赞助信息（fund）       | 给出指定包的赞助相关信息                                     |
| help & help search     | 帮助与相关文档搜索                                           |
| hook（挂钩）           | 包发生更改时执行相关的操作                                   |
| 清洁测试（cit）        | Npm ci +npm test                                             |
| 安装测试（it）         | Nom i + npm test                                             |
| 组织org                | 组织管理                                                     |
| ping                   | ping 配置的或者指定的注册表                                  |
| 本地前缀（prefix）     | 输出本地项目的前缀，可指定 -g（全局安装路径）                |
| 个人资料（profile）    | 修改npmjs 上注册的个人资料                                   |
| 修剪（prune）          | 删除package没有添加到依赖的包，有lock文件时回在安装时自动做这步 |
| 重新编译（rb）         | 用最新的环境重新编译，会使用最新的二进制文件编译所有c++插件  |
| 仓库（repo）           | 通过浏览器打开指定包的仓库URL                                |
| 重新开始（restart）    |                                                              |
| 根（root）             | 输出 当前项目可用的node_modules 文件夹                       |
| 搜索（search）         | 在注册表上搜索                                               |
| shrinkwrap             | 将package-lock.json 生成shrinkwrap.json ，此文件优先级高于lock[文件](https://docs.npmjs.com/cli/v6/configuring-npm/package-locks) |
| 星标（star&stars）     | 对项目添加星标&列出星标的项目                                |
| 团队（team）           | 团队管理                                                     |
| 令牌（token）          | 创建/作废令牌                                                |
| 取消发布（unpublish）  | 取消发布包的指定版本或者整个包                               |
| 我是谁（whoami）       | 打印用户名                                                   |

yarn 命令及说明：https://classic.yarnpkg.com/en/docs/cli/
npm cli 命令：https://docs.npmjs.com/cli/v6/commands