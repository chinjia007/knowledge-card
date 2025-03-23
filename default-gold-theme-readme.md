# 金黄色主题设置指南

此脚本可将知识卡片加载后的默认主题颜色设置为金黄色。

## 使用方法

1. 打开浏览器的开发者工具：
   - Chrome/Edge: 按 F12 或 Ctrl+Shift+I (Windows) / Cmd+Option+I (Mac)
   - Firefox: 按 F12 或 右键点击页面并选择"检查元素"
   - Safari: 先在偏好设置中启用开发者菜单，然后按 Cmd+Option+I

2. 切换到"控制台"(Console)标签

3. 复制以下代码并粘贴到控制台中：

```javascript
// 金黄色主题设置脚本
(function() {
    console.log('开始设置金黄色为默认主题...');
    
    // 金黄色RGB值
    const goldColor = 'rgba(255, 215, 0, 0.75)';
    const goldRGB = '255, 215, 0';
    
    // 设置CSS根变量
    document.documentElement.style.setProperty('--theme-color-rgb', goldRGB);
    console.log('已设置CSS变量 --theme-color-rgb:', goldRGB);
    
    // 查找并修改检测卡片颜色的函数
    const originalDetectCardColor = window.detectCardColor;
    
    if (typeof originalDetectCardColor === 'function') {
        // 替换原有的颜色检测函数
        window.detectCardColor = function() {
            console.log('颜色检测函数被调用，返回金黄色');
            return goldColor;
        };
        console.log('已覆盖颜色检测函数');
        
        // 手动触发颜色应用
        const iframe = document.querySelector('iframe[src*="code-stream.html"]');
        if (iframe && iframe.contentWindow) {
            try {
                console.log('向iframe发送金黄色主题');
                iframe.contentWindow.postMessage({
                    type: 'changeTheme',
                    color: goldColor
                }, '*');
                
                // 多次发送确保生效
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        iframe.contentWindow.postMessage({
                            type: 'changeTheme',
                            color: goldColor
                        }, '*');
                    }, 500 * (i + 1));
                }
            } catch(e) {
                console.error('向iframe发送颜色失败:', e);
            }
        } else {
            console.log('找不到代码流iframe，等待页面加载完成后再试');
        }
    } else {
        // 如果函数未定义，则创建一个直接覆盖变量
        console.log('未找到颜色检测函数，直接覆盖全局变量');
        
        // 覆盖全局变量
        window.lastAppliedColor = goldColor;
        window.lastDetectedThemeColor = goldColor;
        
        // 创建一个元素用于存储默认颜色
        const defaultColorElement = document.createElement('div');
        defaultColorElement.id = 'default-theme-color';
        defaultColorElement.style.display = 'none';
        defaultColorElement.dataset.color = goldColor;
        defaultColorElement.dataset.rgb = goldRGB;
        document.body.appendChild(defaultColorElement);
        
        // 监听DOMContentLoaded事件，以便在页面完全加载后应用颜色
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', applyGoldColor);
        } else {
            applyGoldColor();
        }
    }
    
    // 强制应用颜色的函数
    function applyGoldColor() {
        console.log('强制应用金黄色主题');
        
        // 查找任何可能存在的按钮
        const toggleButtons = document.querySelectorAll('.ai-toggle, .toggle-background');
        toggleButtons.forEach(button => {
            // 更新按钮状态
            if (button.getAttribute('data-state') === 'off') {
                // 设置按钮核心颜色
                const core = button.querySelector('.ai-core');
                if (core) {
                    core.style.backgroundColor = `rgba(${goldRGB}, 0.9)`;
                    core.style.boxShadow = `0 0 10px rgba(${goldRGB}, 0.8)`;
                }
                
                // 设置光环颜色
                const rings = button.querySelectorAll('.ai-ring');
                rings.forEach(ring => {
                    ring.style.borderColor = `rgba(${goldRGB}, 0.7)`;
                    ring.style.boxShadow = `0 0 20px rgba(${goldRGB}, 0.6), 0 0 5px rgba(${goldRGB}, 0.9) inset`;
                });
                
                // 设置脉冲效果颜色
                const pulse = button.querySelector('.ai-pulse');
                if (pulse) {
                    pulse.style.backgroundColor = `rgba(${goldRGB}, 0.15)`;
                }
            }
        });
        
        // 查找iframe并向其发送颜色信息
        const iframe = document.querySelector('iframe[src*="code-stream.html"]');
        if (iframe && iframe.contentWindow) {
            try {
                iframe.contentWindow.postMessage({
                    type: 'changeTheme',
                    color: goldColor
                }, '*');
            } catch(e) {
                console.error('向iframe发送颜色失败:', e);
            }
        }
    }
    
    // 设置一个定期检查，确保颜色保持为金黄色
    setInterval(() => {
        document.documentElement.style.setProperty('--theme-color-rgb', goldRGB);
        
        // 查找任何可能显示的按钮并更新其颜色
        const visibleButton = document.querySelector('.ai-toggle[data-state="off"]');
        if (visibleButton) {
            const core = visibleButton.querySelector('.ai-core');
            if (core && !core.style.backgroundColor.includes('255, 215, 0')) {
                core.style.backgroundColor = `rgba(${goldRGB}, 0.9)`;
                core.style.boxShadow = `0 0 10px rgba(${goldRGB}, 0.8)`;
                
                // 设置新的圆环元素样式
                visibleButton.style.setProperty('--theme-color-rgb', goldRGB);
                
                const rings = visibleButton.querySelectorAll('.ai-ring');
                rings.forEach(ring => {
                    ring.style.borderColor = `rgba(${goldRGB}, 0.7)`;
                    ring.style.boxShadow = `0 0 20px rgba(${goldRGB}, 0.6)`;
                });
            }
        }
    }, 2000);
    
    console.log('金黄色主题设置完成');
})();
```

4. 按下回车键执行代码

## 功能介绍

此脚本可以：

- 将知识卡片的默认主题颜色设置为金黄色（RGB: 255, 215, 0）
- 覆盖原有的颜色检测函数，确保始终返回金黄色
- 强制更新按钮的显示颜色，包括核心、光环和脉冲效果
- 建立定期检查机制，确保主题颜色保持为金黄色
- 适应不同的页面结构和加载状态

## 自动加载方法

如果希望每次打开页面时自动应用金黄色主题，可以：

1. 将上述代码保存为书签：
   - 在浏览器中创建一个新书签
   - 在"名称"中输入"金黄色主题"
   - 在"URL"中粘贴上述代码，但在代码前加上`javascript:`
   - 保存书签

2. 每次打开知识卡片页面后，点击该书签即可应用金黄色主题

## 注意事项

- 此脚本不会永久修改页面结构，刷新页面后需要重新应用
- 如果页面结构发生重大变化，脚本可能需要更新
- 脚本使用了现代JavaScript特性，请确保使用最新版本的浏览器 