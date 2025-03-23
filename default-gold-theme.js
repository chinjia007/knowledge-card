/**
 * 金黄色主题设置脚本
 * 该脚本可设置知识卡片加载后的默认主题为金黄色
 */

// 立即自执行函数
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