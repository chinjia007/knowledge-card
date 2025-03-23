# 知识卡片制作工具 - 快速开始指南

## 直接打开方式

最简单的方式是直接在浏览器中打开 `index.html` 文件，无需任何额外设置。

## 开发服务器启动方式

如果你想使用开发服务器运行项目，可以按照以下步骤操作：

1. 确保已安装 [Node.js](https://nodejs.org/)（推荐版本 14.x 或更高）

2. 在项目根目录下打开终端，运行以下命令安装依赖：

```bash
npm install
```

3. 启动开发服务器：

```bash
npm start
```

4. 在浏览器中访问 `http://localhost:5000` 即可使用工具

## 导出图片功能

目前导出图片功能需要引入 html2canvas 库。如果你想启用这个功能，请按照以下步骤操作：

1. 安装 html2canvas：

```bash
npm install html2canvas
```

2. 修改 `index.html` 文件，在 `<script src="script.js"></script>` 之前添加：

```html
<script src="node_modules/html2canvas/dist/html2canvas.min.js"></script>
```

3. 然后修改 `script.js` 文件中的导出按钮事件处理函数：

```javascript
// 导出高清图片
exportBtn.addEventListener('click', function() {
    html2canvas(document.getElementById('card-preview')).then(function(canvas) {
        const link = document.createElement('a');
        link.download = '知识卡片.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});
```

## 使用提示

1. 选择模式：切换"知识点卡片模式"和"测试题卡片模式"
2. 自定义配色：点击色块更改卡片模块的颜色
3. 排版样式：选择不同的布局方式展示内容
4. 增加/删除模块：动态调整卡片中的内容模块数量
5. 输入区：按照示例格式输入内容，系统会自动解析并格式化显示
6. 实时预览：输入内容后，右侧会实时更新卡片预览效果 