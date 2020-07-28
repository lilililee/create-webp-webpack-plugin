# create-webp-webpack-plugin
[简体中文文档](./README_zh-CN.md)
将项目图片生成对应的webp格式  

## 安装

```sh
npm i -D create-webp-webpack-plugin
// or
yarn add -D create-webp-webpack-plugin
```

## 选项

#### match
Type: `regexp`
Default: `/\.(png|gif|svg)$/`

匹配需要生成webp的图片

#### webp
Type: `object`
Default: `{ lossless: true }`  

该选项同 [sharp webp options](https://sharp.pixelplumbing.com/api-output#webp)


## License

[MIT](http://opensource.org/licenses/MIT)
