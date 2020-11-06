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



| 特性                    | npm  | Yarn | 说明                                                         |
| ----------------------- | ---- | ---- | ------------------------------------------------------------ |
| 安装依赖（install）     | yes  | yes  | 可选择 离线、静默、指定安装路径、不产生lock文件等安装方式，yarn 默认清洁安装，相当于 npm ci，同时 yarn install 只会安装已经存在package.json 的依赖，如果需要安装新的依赖使用的是add命令。npm 支持从git仓库或者其他远程地址安装，功能更为细致； |
| 审核（audit）           | yes  | yes  | 检查已安装包的已知问题                                       |
| 清理node_modules        | no   | yes  | npm 可以手动删除node_modules 再安装实现                      |
| 展示执行文件位置（bin） | yes  | yes  | 展示工具自身的执行文件地址                                   |
| 缓存（cache）           | yes  | yes  | 基本相同，yarn可以直接列出所有已缓存的项，并且兼容.npmrc 的缓存配置 |
| 检查（check）           | no   | yes  | 检查当前 node_modules 中的安装项和package.json 是否匹配      |
| 配置（config）          | yes  | yes  | 基本相同                                                     |
| 创建（create）          | yes  | yes  | 安装create-* 工具，并执行工具package.json的bin;npm 则提供功能更加丰富的npx命令，功能覆盖 create 命令 |
| 删除重复数据（dedupe）  | yes  | yes  | yarn 在install 时默认执行                                    |
| 生成lock清单            | no   | yes  | 根据package.json生成lock的条目                               |
| 全局操作（global）      | yes  | yes  | 在全局环境下的安装、删除、查看等操作, npm 通过-g 标志，yarn则是 yarn global 跟上具体操作 |
| 帮助信息                | yes  | yes  |                                                              |
| 导入（import）          | -    | yes  | 根据package-lock.json 或node_modules 生成yarn.lock文件       |
| 包信息（info）          | no   | yes  | 列出指定包的相关信息                                         |
| 初始化（init）          | yes  | yes  | 基本相同                                                     |
| 许可证信息（license）   | no   | yes  | 列出所有安装的软件包的许可证信息                             |
|                         |      |      |                                                              |

yarn 命令及说明：https://classic.yarnpkg.com/en/docs/cli/
npm cli 命令：https://docs.npmjs.com/cli/v6/commands