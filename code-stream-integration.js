/**
 * 代码流背景效果集成
 * 将代码流效果作为背景添加到知识卡片页面
 */
document.addEventListener('DOMContentLoaded', function() {
    // 立即检测并记录卡片初始颜色
    const initialCardColor = 'rgba(255, 215, 0, 0.75)'; // 始终使用金黄色作为初始颜色
    console.log('设置默认金黄色:', initialCardColor);
    
    // 提取RGB值并设置CSS变量
    const rgbValues = extractRGB(initialCardColor);
    document.documentElement.style.setProperty('--theme-color-rgb', rgbValues);
    console.log('设置主题色RGB变量:', rgbValues);
    
    // 保存全局变量以供后续使用
    window.lastAppliedColor = initialCardColor;
    window.lastDetectedThemeColor = initialCardColor;
    
    // 创建背景容器
    const backgroundContainer = document.createElement('div');
    backgroundContainer.className = 'background-container';
    backgroundContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none;';
    
    // 修改iframe的src，直接传入初始颜色参数
    const iframe = document.createElement('iframe');
    iframe.src = `code-stream.html?initialColor=${encodeURIComponent(initialCardColor)}`; // 通过URL参数传递初始颜色
    iframe.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; z-index: -1; pointer-events: none; background-color: transparent;';
    iframe.title = '代码流背景效果';
    iframe.setAttribute('allowtransparency', 'true');
    
    // 创建等待指示器
    const loadingIndicator = document.createElement('div');
    loadingIndicator.style.cssText = 'position: fixed; top: 20px; left: 20px; padding: 5px 10px; background: rgba(0,0,0,0.5); color: white; border-radius: 4px; font-size: 12px; z-index: 9999; transition: opacity 0.5s ease;';
    loadingIndicator.textContent = '背景加载中...';
    document.body.appendChild(loadingIndicator);
    
    // 在iframe加载完成后立即应用颜色
    function applyInitialColor() {
        console.log('初始金黄色:', initialCardColor);

        // 立即应用颜色
        try {
            console.log('向iframe发送初始金黄色');
            iframe.contentWindow.postMessage({
                type: 'changeTheme',
                color: initialCardColor
            }, '*');
            
            // 额外的检查，确保颜色被应用
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    console.log(`第${i+1}次发送金黄色确认`);
                    iframe.contentWindow.postMessage({
                        type: 'changeTheme',
                        color: initialCardColor
                    }, '*');
                }, 300 * (i + 1));
            }
            
            // 隐藏加载指示器
            setTimeout(() => {
                loadingIndicator.style.opacity = '0';
                setTimeout(() => {
                    loadingIndicator.remove();
                }, 500);
            }, 1500);
            
        } catch(e) {
            console.error('发送颜色失败:', e);
        }
    }
    
    // 添加iframe加载事件监听
    iframe.onload = function() {
        console.log('iframe已加载完成');
        
        // 延时确保iframe内容完全准备好
        setTimeout(applyInitialColor, 300);
    };

    // 将iframe添加到背景容器
    backgroundContainer.appendChild(iframe);
    
    // 将背景容器添加到body，确保它在所有内容最底层
    document.body.insertBefore(backgroundContainer, document.body.firstChild);
    
    // 确保应用容器在代码流之上，并添加适当的背景透明度
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
        appContainer.style.position = 'relative';
        appContainer.style.zIndex = '10';
        
        // 将卡片预览容器背景设置为半透明
        const previewContainer = document.querySelector('.preview-container');
        if (previewContainer) {
            previewContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            previewContainer.style.backdropFilter = 'blur(5px)';
            previewContainer.style.borderRadius = '10px';
            previewContainer.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }
        
        // 让工具栏保持不透明，便于操作
        const toolbar = document.querySelector('.toolbar');
        if (toolbar) {
            toolbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            toolbar.style.backdropFilter = 'blur(8px)';
            toolbar.style.borderRadius = '10px';
            toolbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }
    }
    
    // 添加切换代码流背景的控制按钮 - 高级设计版
    const toggleButton = document.createElement('div');
    toggleButton.className = 'toggle-background ai-toggle';
    toggleButton.innerHTML = `
        <div class="ai-core"></div>
        <div class="ai-ring ring1"></div>
        <div class="ai-ring ring2"></div>
        <div class="ai-ring ring3"></div>
        <div class="ai-pulse"></div>
    `;
    
    // 添加高级样式
    const buttonStyle = document.createElement('style');
    buttonStyle.textContent = `
        .ai-toggle {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: rgba(5, 10, 20, 0.7);
            box-shadow: 0 0 15px rgba(var(--theme-color-rgb), 0.3);
            cursor: pointer;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: float 3s ease-in-out infinite;
            backdrop-filter: blur(4px);
            transition: all 0.3s ease;
        }
        
        .ai-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 0 20px rgba(var(--theme-color-rgb), 0.5);
        }
        
        .ai-toggle .ai-core {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(var(--theme-color-rgb), 0.9);
            box-shadow: 0 0 10px rgba(var(--theme-color-rgb), 0.8);
            position: relative;
            z-index: 5;
            animation: pulse 2s ease-in-out infinite;
        }
        
        .ai-toggle .ai-ring {
            position: absolute;
            border-radius: 50%;
            border: 2px solid rgba(var(--theme-color-rgb), 0.6);
            opacity: 0;
            filter: blur(0.5px);
            box-shadow: 0 0 10px rgba(var(--theme-color-rgb), 0.4);
        }
        
        .ai-toggle .ring1 {
            width: 25px;
            height: 25px;
            animation: ripple 2.5s ease-out infinite;
            animation-delay: 0s;
            clip-path: polygon(
                50% 0%, 61% 19%, 98% 35%, 71% 60%, 
                98% 100%, 50% 83%, 0% 100%, 21% 61%, 
                0% 35%, 35% 20%
            );
            transform-origin: center;
        }
        
        .ai-toggle .ring2 {
            width: 35px;
            height: 35px;
            animation: electricity 3s ease-in-out infinite;
            animation-delay: 0.5s;
            border-style: dashed;
            border-width: 1px;
        }
        
        .ai-toggle .ring3 {
            width: 45px;
            height: 45px;
            animation: plasma 3.5s cubic-bezier(0.36, 0.66, 0.04, 1) infinite;
            animation-delay: 1s;
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
        }
        
        .ai-toggle .ai-pulse {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: rgba(var(--theme-color-rgb), 0.15);
            animation: aiPulse 2s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 10px rgba(var(--theme-color-rgb), 0.8);
            }
            50% {
                transform: scale(0.9);
                box-shadow: 0 0 15px rgba(var(--theme-color-rgb), 0.6);
            }
        }
        
        @keyframes ripple {
            0% {
                transform: scale(0.8) rotate(0deg);
                opacity: 0.8;
                filter: blur(0.5px) brightness(1.2);
            }
            25% {
                transform: scale(1.2) rotate(45deg);
                opacity: 0.6;
                filter: blur(1px) brightness(1.4);
            }
            50% {
                opacity: 0.5;
                transform: scale(1.5) rotate(90deg);
                filter: blur(1px) brightness(1.5);
            }
            75% {
                transform: scale(1.7) rotate(135deg);
                opacity: 0.3;
                filter: blur(1.2px) brightness(1.3);
            }
            100% {
                transform: scale(2) rotate(180deg);
                opacity: 0;
                filter: blur(1.5px) brightness(1);
            }
        }
        
        @keyframes aiPulse {
            0%, 100% {
                opacity: 0.2;
                transform: scale(1);
            }
            50% {
                opacity: 0.4;
                transform: scale(1.1);
            }
        }
        
        /* 为按钮添加状态指示 */
        .ai-toggle[data-state="on"] .ai-core {
            background: rgba(255, 60, 60, 0.9);
        }
        
        .ai-toggle[data-state="off"] .ai-core {
            background: rgba(var(--theme-color-rgb), 0.9);
        }
        
        .ai-toggle[data-state="off"] .ai-ring {
            border-color: rgba(var(--theme-color-rgb), 0.6);
            box-shadow: 0 0 15px rgba(var(--theme-color-rgb), 0.4);
        }
        
        .ai-toggle[data-state="on"] .ai-ring {
            border-color: rgba(255, 60, 60, 0.6);
            box-shadow: 0 0 15px rgba(255, 60, 60, 0.4);
        }
        
        .ai-toggle[data-state="on"] .ai-pulse {
            background: rgba(255, 60, 60, 0.15);
        }
        
        .ai-toggle[data-state="off"] .ai-pulse {
            background: rgba(var(--theme-color-rgb), 0.15);
        }
    `;
    document.head.appendChild(buttonStyle);
    
    // 设置初始状态
    toggleButton.setAttribute('data-state', 'on');
    
    // 点击切换背景显示/隐藏
    toggleButton.addEventListener('click', function() {
        if (backgroundContainer.style.display === 'none') {
            // 显示背景，开启状态，使用红色
            backgroundContainer.style.display = 'block';
            toggleButton.setAttribute('data-state', 'on');
            
            // 固定使用红色
            toggleButton.querySelector('.ai-core').style.background = 'rgba(255, 60, 60, 0.9)';
            toggleButton.querySelector('.ai-pulse').style.background = 'rgba(255, 60, 60, 0.15)';
            
            // 增强涟漪效果，使用红色
            const rings = toggleButton.querySelectorAll('.ai-ring');
            rings.forEach(ring => {
                ring.style.borderColor = 'rgba(255, 60, 60, 0.7)';
                ring.style.boxShadow = '0 0 20px rgba(255, 60, 60, 0.6), 0 0 5px rgba(255, 60, 60, 0.9) inset';
                ring.style.filter = 'blur(0.5px) brightness(1.3)';
            });
            
            // 添加透明效果到应用容器
            if (appContainer) {
                const previewContainer = document.querySelector('.preview-container');
                if (previewContainer) {
                    previewContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                    previewContainer.style.backdropFilter = 'blur(5px)';
                }
            }
        } else {
            // 隐藏背景，关闭状态，使用主题色
            backgroundContainer.style.display = 'none';
            toggleButton.setAttribute('data-state', 'off');
            
            // 重新检测当前主题色
            const currentCardColor = detectCardColor();
            const themeRGB = extractRGB(currentCardColor);
            
            // 更新全局CSS变量
            document.documentElement.style.setProperty('--theme-color-rgb', themeRGB);
            console.log('更新主题色:', themeRGB);
            
            // 恢复主题色涟漪效果
            const rings = toggleButton.querySelectorAll('.ai-ring');
            rings.forEach(ring => {
                // 移除可能存在的默认样式
                ring.style.removeProperty('border-color');
                ring.style.borderColor = `rgba(${themeRGB}, 0.7)`;
                ring.style.boxShadow = `0 0 20px rgba(${themeRGB}, 0.6), 0 0 5px rgba(${themeRGB}, 0.9) inset`;
                ring.style.filter = 'blur(0.5px) brightness(1.3)';
            });
            
            // 确保核心和脉冲也使用正确的主题色
            toggleButton.querySelector('.ai-core').style.background = `rgba(${themeRGB}, 0.9)`;
            toggleButton.querySelector('.ai-pulse').style.background = `rgba(${themeRGB}, 0.15)`;
            
            // 恢复应用容器背景
            if (appContainer) {
                const previewContainer = document.querySelector('.preview-container');
                if (previewContainer) {
                    previewContainer.style.backgroundColor = 'white';
                    previewContainer.style.backdropFilter = 'none';
                }
            }
        }
        
        // 还可以通过postMessage向iframe发送消息实现额外控制
        try {
            iframe.contentWindow.postMessage('toggle', '*');
        } catch(e) {
            console.error('无法向代码流框架发送消息', e);
        }
    });
    
    // 添加切换按钮到页面
    document.body.appendChild(toggleButton);
    
    // 保留主题颜色配置，但移除主题切换按钮
    const themes = [
        {name: '矩阵绿', color: 'rgba(15, 255, 15, 0.4)'},
        {name: '赛博蓝', color: 'rgba(0, 180, 255, 0.4)'},
        {name: '粉色', color: 'rgba(255, 105, 180, 0.4)'},
        {name: '薄荷绿', color: 'rgba(60, 220, 160, 0.4)'},
        {name: '淡紫色', color: 'rgba(180, 140, 255, 0.4)'},
        {name: '天蓝色', color: 'rgba(100, 180, 255, 0.4)'},
        {name: '橙色', color: 'rgba(255, 165, 0, 0.4)'},
        {name: '珊瑚色', color: 'rgba(255, 127, 80, 0.4)'},
        {name: '金色', color: 'rgba(255, 215, 0, 0.4)'},
        {name: '浅绿色', color: 'rgba(152, 251, 152, 0.4)'},
        {name: '淡蓝色', color: 'rgba(173, 216, 230, 0.4)'}
    ];
    
    // 获取当前卡片颜色并设置相应的代码流颜色
    function detectCardColor() {
        // 先检查是否有全局设置的颜色
        if (window.lastAppliedColor) {
            console.log('使用上次应用的颜色:', window.lastAppliedColor);
            return window.lastAppliedColor;
        }
        
        // 检查卡片元素的当前主题类
        const card = document.querySelector('.card');
        if (card) {
            const themeClass = Array.from(card.classList)
                .find(cls => cls.startsWith('theme-'));
            
            if (themeClass) {
                // 如果找到主题类，获取对应的RGB值
                const themeRGB = getThemeRGB(themeClass);
                const themeColor = `rgba(${themeRGB}, 0.75)`;
                console.log('通过主题类检测到颜色:', themeColor);
                return themeColor;
            }
        }
        
        // 常规检测方法
        const cardElement = document.querySelector('.card-container') || 
                            document.querySelector('.knowledge-card') || 
                            document.querySelector('[class*="card"]');
        
        if (cardElement) {
            const computedStyle = window.getComputedStyle(cardElement);
            let cardColor = computedStyle.backgroundColor || computedStyle.background || '';
            
            if (cardColor === 'rgba(0, 0, 0, 0)' || cardColor === 'transparent') {
                cardColor = computedStyle.borderColor || 
                           computedStyle.color || 
                           'rgba(255, 215, 0, 0.75)'; // 默认使用金黄色
            }
            
            console.log('通过计算样式检测到颜色:', cardColor);
            return cardColor;
        }
        
        // 默认返回金黄色
        console.log('未检测到卡片元素，返回默认金黄色');
        return 'rgba(255, 215, 0, 0.75)';
    }
    
    // 根据主题类名获取对应的RGB值
    function getThemeRGB(themeClass) {
        // 主题颜色映射表
        const themeColorMap = {
            'theme-softpink': '255, 192, 203',
            'theme-lilac': '200, 162, 200',
            'theme-mint': '152, 255, 152',
            'theme-peach': '255, 229, 180',
            'theme-skyblue': '135, 206, 235',
            'theme-marigold': '255, 165, 0',
            'theme-babyblue': '137, 207, 240',
            'theme-lavender': '180, 160, 240',
            'theme-sage': '186, 208, 136',
            'theme-coral': '255, 127, 80',
            'theme-turquoise': '48, 213, 200',
            'theme-blush': '255, 111, 207',
            'theme-butter': '255, 255, 102',
            'theme-periwinkle': '204, 204, 255',
            'theme-pistachio': '147, 197, 114',
            'theme-bubblegum': '255, 105, 180',
            'theme-cloudy': '200, 200, 225',
            'theme-banana': '255, 225, 53',
            'theme-seafoam': '120, 222, 213',
            'theme-strawberry': '252, 90, 141',
            'theme-slate': '112, 128, 144',
            'theme-sunflower': '255, 215, 0',
            'theme-moss': '134, 180, 102',
            'theme-cornflower': '100, 149, 237',
            'theme-grad-yellow-orange': '255, 190, 11',
            'theme-grad-pink': '255, 105, 180',
            'theme-grad-cyan-blue': '0, 190, 214',
            'theme-grad-purple': '128, 0, 128',
            'theme-grad-purple-pink': '180, 70, 200',
            'theme-grad-green': '76, 187, 23',
            'theme-grad-pink-purple': '219, 112, 219',
            'theme-grad-blue-purple': '65, 105, 225',
            'theme-grad-teal-green': '20, 180, 170',
            'theme-grad-blue': '30, 144, 255',
            'theme-grad-yellow': '255, 223, 0',
            'theme-grad-light-blue': '173, 216, 230',
            'theme-grad-orange-red': '255, 99, 71',
            'theme-grad-purple-light': '147, 112, 219',
            'theme-grad-teal': '0, 128, 128',
            'theme-grad-peach': '255, 218, 185',
            'theme-grad-light-green': '144, 238, 144',
            'theme-grad-lavender': '230, 230, 250',
            'theme-grad-pink-red': '255, 20, 147',
            'theme-grad-orange': '255, 165, 0'
        };
        
        // 返回主题对应的RGB值，如果找不到则返回金黄色
        return themeColorMap[themeClass] || '255, 215, 0';
    }

    // 提取RGB值的函数
    function extractRGB(color) {
        let r, g, b;
        const rgbMatch = color.match(/rgba?\(([^,]+),([^,]+),([^,]+)/);
        
        if (rgbMatch) {
            r = parseInt(rgbMatch[1].trim());
            g = parseInt(rgbMatch[2].trim());
            b = parseInt(rgbMatch[3].trim());
        } else {
            r = 255; g = 215; b = 0; // 默认值为金黄色
        }
        
        return `${r}, ${g}, ${b}`;
    }

    // 应用卡片颜色到代码流背景
    function applyCardColorToBackground() {
        const cardColor = detectCardColor();
        console.log('检测到卡片颜色:', cardColor);
        
        // 确保iframe已加载
        if (!iframe.contentWindow) {
            console.warn('iframe尚未加载，延迟应用颜色');
            setTimeout(applyCardColorToBackground, 500);
            return;
        }

        try {
            console.log('向iframe发送卡片主题颜色');
            
            // 优先确保代码流页面已加载
            if (iframe.contentDocument && iframe.contentDocument.readyState !== 'complete') {
                console.log('iframe内容尚未完全加载，延迟发送颜色');
                setTimeout(() => applyCardColorToBackground(), 500);
                return;
            }
            
            // 直接应用颜色
            iframe.contentWindow.postMessage({
                type: 'changeTheme',
                color: cardColor
            }, '*');
            
            // 多次尝试发送颜色，确保应用成功
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    console.log(`第${i+1}次重试发送颜色`);
                    try {
                        iframe.contentWindow.postMessage({
                            type: 'changeTheme',
                            color: cardColor
                        }, '*');
                    } catch (e) {
                        console.error(`第${i+1}次发送颜色失败:`, e);
                    }
                }, 300 * (i + 1));
            }
            
            // 存储当前应用的颜色，用于后续检测颜色变化
            lastAppliedColor = cardColor;
        } catch(e) {
            console.error('无法向代码流框架发送主题消息', e);
            // 错误后再次尝试
            setTimeout(applyCardColorToBackground, 1000);
        }
    }
    
    // 存储上次应用的颜色
    let lastAppliedColor = null;
    
    // 页面加载后自动应用卡片颜色
    setTimeout(applyCardColorToBackground, 1000);
    
    // 设置定时器定期检查卡片颜色是否变化，如变化则更新背景颜色
    // 这对于用户在界面上改变卡片颜色时自动响应很有用
    setInterval(function() {
        const currentCardColor = detectCardColor();
        if (currentCardColor !== lastAppliedColor) {
            console.log('卡片颜色已变化，更新背景颜色');
            applyCardColorToBackground();
        }
    }, 2000); // 每2秒检查一次
    
    // 监听来自iframe的消息
    window.addEventListener('message', function(event) {
        // 检查来源以确保安全
        console.log('收到消息:', event.data);
        
        if (event.data && event.data.type === 'themeUpdated') {
            console.log('收到iframe确认主题已更新:', event.data.color);
        }
    });
    
    // 监听可能的DOM变化，特别是卡片样式变化
    const observer = new MutationObserver(function(mutations) {
        // 当DOM变化时，检查卡片颜色是否改变
        const currentCardColor = detectCardColor();
        if (currentCardColor !== lastAppliedColor) {
            console.log('DOM变化导致卡片颜色改变，更新背景颜色');
            applyCardColorToBackground();
        }
    });
    
    // 开始观察整个文档或特定元素
    const card = document.querySelector('.card');
    if (card) {
        observer.observe(card, { 
            attributes: true, 
            attributeFilter: ['style', 'class'],
            subtree: true,
            childList: true
        });
    } else {
        // 如果找不到卡片，观察整个文档
        observer.observe(document.body, { 
            childList: true, 
            subtree: true 
        });
    }

    // 保存上次检测到的主题色
    let lastDetectedThemeColor = initialCardColor;
    
    // 周期性检查主题色变化，并更新按钮状态
    setInterval(function() {
        // 检查按钮状态
        const mainButton = document.querySelector('.toggle-background.ai-toggle');
        const backupButton = document.querySelector('.visible-toggle');
        const button = mainButton || backupButton;
        
        if (button) {
            // 获取当前状态
            const currentState = button.getAttribute('data-state');
            
            // 如果是关闭状态，则需要检查主题色是否变化
            if (currentState === 'off') {
                const currentThemeColor = detectCardColor();
                
                // 如果主题色变化，更新按钮样式
                if (currentThemeColor !== lastDetectedThemeColor) {
                    console.log('主题色已变化，更新按钮颜色:', currentThemeColor);
                    
                    // 提取新的RGB值
                    const themeRGB = extractRGB(currentThemeColor);
                    
                    // 更新全局CSS变量
                    document.documentElement.style.setProperty('--theme-color-rgb', themeRGB);
                    
                    // 更新按钮样式
                    if (button) {
                        button.querySelector('.ai-core').style.background = `rgba(${themeRGB}, 0.9)`;
                        button.querySelector('.ai-pulse').style.background = `rgba(${themeRGB}, 0.15)`;
                        button.querySelectorAll('.ai-ring').forEach(ring => {
                            ring.style.removeProperty('border-color');
                            ring.style.borderColor = `rgba(${themeRGB}, 0.7)`;
                            ring.style.boxShadow = `0 0 20px rgba(${themeRGB}, 0.6), 0 0 5px rgba(${themeRGB}, 0.9) inset`;
                            ring.style.filter = 'blur(0.5px) brightness(1.3)';
                        });
                    }
                    
                    // 更新最后检测到的主题色
                    lastDetectedThemeColor = currentThemeColor;
                }
            } else if (currentState === 'on') {
                // 确保开启状态下始终使用红色
                button.querySelector('.ai-core').style.background = 'rgba(255, 60, 60, 0.9)';
                button.querySelector('.ai-pulse').style.background = 'rgba(255, 60, 60, 0.15)';
                button.querySelectorAll('.ai-ring').forEach(ring => {
                    ring.style.borderColor = 'rgba(255, 60, 60, 0.7)';
                    ring.style.boxShadow = '0 0 20px rgba(255, 60, 60, 0.6), 0 0 5px rgba(255, 60, 60, 0.9) inset';
                });
                
                // 同时更新当前主题色以备状态切换时使用
                lastDetectedThemeColor = detectCardColor();
            }
        }
    }, 2000); // 每2秒检查一次
});

// 创建代码流容器并添加到知识卡片
function createCodeStreamContainer() {
    // 创建iframe容器
    const initialColor = detectCardColor();
    const encodedColor = encodeURIComponent(initialColor);
    const streamContainer = document.createElement('div');
    streamContainer.className = 'code-stream-container';
    streamContainer.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10;';
    
    // 创建iframe
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'border: none; width: 100%; height: 100%; pointer-events: none; background: transparent;';
    iframe.setAttribute('title', '代码流效果');
    iframe.setAttribute('src', `code-stream.html?initialColor=${encodedColor}`);
    iframe.setAttribute('id', 'codeStreamIframe');
    iframe.setAttribute('loading', 'eager');
    
    // 添加loading指示器
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'codeStreamLoading';
    loadingIndicator.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.5;';
    loadingIndicator.textContent = '加载中...';
    
    // 添加到容器
    streamContainer.appendChild(iframe);
    streamContainer.appendChild(loadingIndicator);
    
    // 添加到知识卡片
    const cardElement = document.querySelector('.card-container') || 
                         document.querySelector('.knowledge-card') || 
                         document.querySelector('[class*="card"]');
    
    if (cardElement) {
        // 确保卡片有相对定位，这样绝对定位的容器才会正确放置
        if (window.getComputedStyle(cardElement).position === 'static') {
            cardElement.style.position = 'relative';
        }
        
        cardElement.appendChild(streamContainer);
        
        // 保存初始颜色
        lastCardColor = initialColor;
        
        // iframe加载完成后隐藏loading指示器
        iframe.onload = function() {
            if (loadingIndicator.parentNode) {
                loadingIndicator.parentNode.removeChild(loadingIndicator);
            }
            
            // 确保iframe正确应用颜色
            setTimeout(() => {
                const iframeWindow = iframe.contentWindow;
                if (iframeWindow) {
                    // 多次尝试发送初始颜色，确保颜色被应用
                    for (let i = 0; i < 3; i++) {
                        setTimeout(() => {
                            try {
                                iframeWindow.postMessage({
                                    type: 'updateColor',
                                    color: initialColor
                                }, '*');
                            } catch (e) {
                                console.error('发送颜色到iframe失败:', e);
                            }
                        }, i * 500); // 0ms, 500ms, 1000ms尝试
                    }
                }
            }, 100);
        };
    }
}

// 文件末尾添加确保按钮可见的代码
setTimeout(function() {
    // 检查按钮是否存在
    let existingButton = document.querySelector('.ai-toggle');
    if (!existingButton) {
        console.log('创建新的控制按钮');
        
        // 创建新按钮
        const visibleButton = document.createElement('div');
        visibleButton.className = 'ai-toggle visible-toggle';
        visibleButton.innerHTML = `
            <div class="ai-core"></div>
            <div class="ai-ring ring1"></div>
            <div class="ai-ring ring2"></div>
            <div class="ai-ring ring3"></div>
            <div class="ai-pulse"></div>
        `;
        
        // 设置固定样式
        visibleButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgba(5, 10, 20, 0.9);
            box-shadow: 0 0 15px rgba(var(--theme-color-rgb), 0.5), 0 0 30px rgba(var(--theme-color-rgb), 0.3);
            cursor: pointer;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // 添加内部元素样式
        const visibleButtonStyle = document.createElement('style');
        visibleButtonStyle.textContent = `
            .visible-toggle {
                animation: float 3s ease-in-out infinite;
                backdrop-filter: blur(3px);
            }
            
            .visible-toggle::after {
                content: '';
                position: absolute;
                top: -10px;
                right: -10px;
                bottom: -10px;
                left: -10px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
                z-index: -1;
                animation: glow 4s infinite;
            }
            
            .visible-toggle .ai-core {
                width: 25px;
                height: 25px;
                border-radius: 50%;
                background: rgba(var(--theme-color-rgb), 0.9);
                box-shadow: 0 0 10px rgba(var(--theme-color-rgb), 0.8), 0 0 20px rgba(var(--theme-color-rgb), 0.4);
                animation: pulse 2s ease-in-out infinite;
            }
            
            /* 为备用按钮添加状态指示 */
            .visible-toggle[data-state="on"] .ai-core {
                background: rgba(255, 60, 60, 0.9) !important;
                box-shadow: 0 0 10px rgba(255, 60, 60, 0.8), 0 0 20px rgba(255, 60, 60, 0.4) !important;
            }
            
            .visible-toggle[data-state="off"] .ai-core {
                background: rgba(var(--theme-color-rgb), 0.9) !important;
                box-shadow: 0 0 10px rgba(var(--theme-color-rgb), 0.8), 0 0 20px rgba(var(--theme-color-rgb), 0.4) !important;
            }
            
            .visible-toggle[data-state="off"] .ai-ring {
                border-color: rgba(var(--theme-color-rgb), 0.6) !important;
            }
            
            .visible-toggle[data-state="on"] .ai-ring {
                border-color: rgba(255, 60, 60, 0.6) !important;
            }
            
            .visible-toggle[data-state="on"] .ai-pulse {
                background: rgba(255, 60, 60, 0.15) !important;
            }
            
            .visible-toggle[data-state="off"] .ai-pulse {
                background: rgba(var(--theme-color-rgb), 0.15) !important;
            }
            
            @keyframes glow {
                0%, 100% {
                    opacity: 0.3;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.6;
                    transform: scale(1.2);
                }
            }
            
            .visible-toggle .ai-ring {
                position: absolute;
                border-radius: 50%;
                border: 2px solid rgba(var(--theme-color-rgb), 0.6);
                opacity: 0;
                filter: blur(0.5px);
            }
            
            .visible-toggle .ring1 {
                width: 25px;
                height: 25px;
                animation: ripple 2.5s ease-out infinite;
                animation-delay: 0s;
                clip-path: polygon(
                    50% 0%, 61% 19%, 98% 35%, 71% 60%, 
                    98% 100%, 50% 83%, 0% 100%, 21% 61%, 
                    0% 35%, 35% 20%
                );
                transform-origin: center;
            }
            
            .visible-toggle .ring2 {
                width: 35px;
                height: 35px;
                animation: electricity 3s ease-in-out infinite;
                animation-delay: 0.5s;
                border-style: dashed;
                border-width: 1px;
            }
            
            .visible-toggle .ring3 {
                width: 45px;
                height: 45px;
                animation: plasma 3.5s cubic-bezier(0.36, 0.66, 0.04, 1) infinite;
                animation-delay: 1s;
                border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
            }
            
            .visible-toggle .ai-pulse {
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: rgba(var(--theme-color-rgb), 0.15);
                animation: aiPulse 2s ease-in-out infinite;
            }
            
            /* 悬停效果 */
            .visible-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 0 20px rgba(var(--theme-color-rgb), 0.5);
            }
        `;
        document.head.appendChild(visibleButtonStyle);
        
        // 定义更新按钮颜色的函数
        function updateButtonColor(color) {
            // 提取RGB值
            let r, g, b;
            const rgbMatch = color.match(/rgba?\(([^,]+),([^,]+),([^,]+)/);
            
            if (rgbMatch) {
                r = parseInt(rgbMatch[1].trim());
                g = parseInt(rgbMatch[2].trim());
                b = parseInt(rgbMatch[3].trim());
            } else {
                r = 15; g = 255; b = 15; // 默认值
            }
            
            // 创建一个新的样式标签来更新按钮颜色
            let buttonColorStyle = document.getElementById('button-color-style');
            if (!buttonColorStyle) {
                buttonColorStyle = document.createElement('style');
                buttonColorStyle.id = 'button-color-style';
                document.head.appendChild(buttonColorStyle);
            }
            
            // 更新按钮颜色样式
            buttonColorStyle.textContent = `
                .visible-toggle .ai-core {
                    background: rgba(${r}, ${g}, ${b}, 0.9) !important;
                    box-shadow: 0 0 10px rgba(${r}, ${g}, ${b}, 0.8) !important;
                }
                
                .visible-toggle .ai-ring {
                    border-color: rgba(${r}, ${g}, ${b}, 0.6) !important;
                }
                
                .visible-toggle .ai-pulse {
                    background: rgba(${r}, ${g}, ${b}, 0.15) !important;
                }
                
                .visible-toggle {
                    box-shadow: 0 0 15px rgba(${r}, ${g}, ${b}, 0.3), 0 0 5px rgba(255, 255, 255, 0.2) !important;
                }
                
                .visible-toggle:hover {
                    box-shadow: 0 0 20px rgba(${r}, ${g}, ${b}, 0.5) !important;
                }
            `;
        }
        
        // 初始化按钮颜色
        const initialCardColor = 'rgba(255, 215, 0, 0.75)'; // 直接使用金黄色
        
        updateButtonColor(initialCardColor);
        
        // 点击切换背景显示/隐藏
        visibleButton.addEventListener('click', function() {
            const backgroundContainer = document.querySelector('.background-container');
            if (backgroundContainer) {
                if (backgroundContainer.style.display === 'none') {
                    // 显示背景，开启状态，使用红色
                    backgroundContainer.style.display = 'block';
                    visibleButton.setAttribute('data-state', 'on');
                    
                    // 添加按钮状态样式 - 固定红色
                    visibleButton.querySelector('.ai-core').style.background = 'rgba(255, 60, 60, 0.9)';
                    visibleButton.querySelector('.ai-pulse').style.background = 'rgba(255, 60, 60, 0.15)';
                    visibleButton.querySelectorAll('.ai-ring').forEach(ring => {
                        ring.style.borderColor = 'rgba(255, 60, 60, 0.7)';
                        ring.style.boxShadow = '0 0 20px rgba(255, 60, 60, 0.6), 0 0 5px rgba(255, 60, 60, 0.9) inset';
                        ring.style.filter = 'blur(0.5px) brightness(1.3)';
                    });
                    
                    // 添加透明效果到应用容器
                    const appContainer = document.querySelector('.app-container');
                    if (appContainer) {
                        const previewContainer = document.querySelector('.preview-container');
                        if (previewContainer) {
                            previewContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                            previewContainer.style.backdropFilter = 'blur(5px)';
                        }
                    }
                } else {
                    // 隐藏背景，关闭状态，使用主题色
                    backgroundContainer.style.display = 'none';
                    visibleButton.setAttribute('data-state', 'off');
                    
                    // 重新检测当前主题色
                    const currentCardColor = detectCardColor();
                    const themeRGB = extractRGB(currentCardColor);
                    
                    // 更新全局CSS变量
                    document.documentElement.style.setProperty('--theme-color-rgb', themeRGB);
                    console.log('更新备用按钮主题色:', themeRGB);
                    
                    // 更新按钮状态样式，使用主题色
                    visibleButton.querySelector('.ai-core').style.background = `rgba(${themeRGB}, 0.9)`;
                    visibleButton.querySelector('.ai-pulse').style.background = `rgba(${themeRGB}, 0.15)`;
                    visibleButton.querySelectorAll('.ai-ring').forEach(ring => {
                        // 移除可能存在的默认样式
                        ring.style.removeProperty('border-color');
                        ring.style.borderColor = `rgba(${themeRGB}, 0.7)`;
                        ring.style.boxShadow = `0 0 20px rgba(${themeRGB}, 0.6), 0 0 5px rgba(${themeRGB}, 0.9) inset`;
                        ring.style.filter = 'blur(0.5px) brightness(1.3)';
                    });
                    
                    // 恢复应用容器背景
                    const appContainer = document.querySelector('.app-container');
                    if (appContainer) {
                        const previewContainer = document.querySelector('.preview-container');
                        if (previewContainer) {
                            previewContainer.style.backgroundColor = 'white';
                            previewContainer.style.backdropFilter = 'none';
                        }
                    }
                }
                
                // 还可以通过postMessage向iframe发送消息实现额外控制
                try {
                    const iframe = backgroundContainer.querySelector('iframe');
                    if (iframe && iframe.contentWindow) {
                        iframe.contentWindow.postMessage('toggle', '*');
                    }
                } catch(e) {
                    console.error('无法向代码流框架发送消息', e);
                }
            } else {
                console.error('找不到背景容器');
            }
        });
        
        // 添加到页面
        document.body.appendChild(visibleButton);
        console.log('已添加可见控制按钮');
    } else {
        console.log('控制按钮已存在，应用强制可见样式');
        existingButton.style.cssText = `
            position: fixed !important;
            bottom: 30px !important;
            right: 30px !important;
            width: 48px !important;
            height: 48px !important;
            z-index: 9999 !important;
            visibility: visible !important;
            opacity: 1 !important;
            display: flex !important;
        `;
    }
    
    // 监听颜色变化事件
    window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'themeUpdated') {
            console.log('收到主题更新，更新按钮颜色:', event.data.color);
            updateButtonColor(event.data.color);
        }
    });
}, 1000); 

// 紧急恢复按钮代码
setTimeout(function() {
    // 检查按钮是否存在
    let existingButton = document.querySelector('.ai-toggle');
    if (!existingButton) {
        console.log('创建新的控制按钮');
        
        // 创建新按钮
        const visibleButton = document.createElement('div');
        visibleButton.className = 'ai-toggle visible-toggle';
        visibleButton.innerHTML = `
            <div class="ai-core"></div>
            <div class="ai-ring ring1"></div>
            <div class="ai-ring ring2"></div>
            <div class="ai-ring ring3"></div>
            <div class="ai-pulse"></div>
        `;
        
        // 设置固定样式
        visibleButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgba(5, 10, 20, 0.9);
            box-shadow: 0 0 15px rgba(var(--theme-color-rgb), 0.5), 0 0 30px rgba(var(--theme-color-rgb), 0.3);
            cursor: pointer;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // 添加内部元素样式
        const visibleButtonStyle = document.createElement('style');
        visibleButtonStyle.textContent = `
            .visible-toggle {
                animation: float 3s ease-in-out infinite;
                backdrop-filter: blur(3px);
            }
            
            .visible-toggle::after {
                content: '';
                position: absolute;
                top: -10px;
                right: -10px;
                bottom: -10px;
                left: -10px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
                z-index: -1;
                animation: glow 4s infinite;
            }
            
            .visible-toggle .ai-core {
                width: 25px;
                height: 25px;
                border-radius: 50%;
                background: rgba(var(--theme-color-rgb), 0.9);
                box-shadow: 0 0 10px rgba(var(--theme-color-rgb), 0.8), 0 0 20px rgba(var(--theme-color-rgb), 0.4);
                animation: pulse 2s ease-in-out infinite;
            }
            
            /* 为备用按钮添加状态指示 */
            .visible-toggle[data-state="on"] .ai-core {
                background: rgba(255, 60, 60, 0.9) !important;
                box-shadow: 0 0 10px rgba(255, 60, 60, 0.8), 0 0 20px rgba(255, 60, 60, 0.4) !important;
            }
            
            .visible-toggle[data-state="off"] .ai-core {
                background: rgba(var(--theme-color-rgb), 0.9) !important;
                box-shadow: 0 0 10px rgba(var(--theme-color-rgb), 0.8), 0 0 20px rgba(var(--theme-color-rgb), 0.4) !important;
            }
            
            .visible-toggle[data-state="off"] .ai-ring {
                border-color: rgba(var(--theme-color-rgb), 0.6) !important;
            }
            
            .visible-toggle[data-state="on"] .ai-ring {
                border-color: rgba(255, 60, 60, 0.6) !important;
            }
            
            .visible-toggle[data-state="on"] .ai-pulse {
                background: rgba(255, 60, 60, 0.15) !important;
            }
            
            .visible-toggle[data-state="off"] .ai-pulse {
                background: rgba(var(--theme-color-rgb), 0.15) !important;
            }
            
            @keyframes glow {
                0%, 100% {
                    opacity: 0.3;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.6;
                    transform: scale(1.2);
                }
            }
            
            .visible-toggle .ai-ring {
                position: absolute;
                border-radius: 50%;
                border: 2px solid rgba(var(--theme-color-rgb), 0.6);
                opacity: 0;
                filter: blur(0.5px);
            }
            
            .visible-toggle .ring1 {
                width: 25px;
                height: 25px;
                animation: ripple 2.5s ease-out infinite;
                animation-delay: 0s;
                clip-path: polygon(
                    50% 0%, 61% 19%, 98% 35%, 71% 60%, 
                    98% 100%, 50% 83%, 0% 100%, 21% 61%, 
                    0% 35%, 35% 20%
                );
                transform-origin: center;
            }
            
            .visible-toggle .ring2 {
                width: 35px;
                height: 35px;
                animation: electricity 3s ease-in-out infinite;
                animation-delay: 0.5s;
                border-style: dashed;
                border-width: 1px;
            }
            
            .visible-toggle .ring3 {
                width: 45px;
                height: 45px;
                animation: plasma 3.5s cubic-bezier(0.36, 0.66, 0.04, 1) infinite;
                animation-delay: 1s;
                border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
            }
            
            .visible-toggle .ai-pulse {
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: rgba(var(--theme-color-rgb), 0.15);
                animation: aiPulse 2s ease-in-out infinite;
            }
            
            /* 悬停效果 */
            .visible-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 0 20px rgba(var(--theme-color-rgb), 0.5);
            }
        `;
        document.head.appendChild(visibleButtonStyle);
        
        // 定义更新按钮颜色的函数
        function updateButtonColor(color) {
            // 提取RGB值
            let r, g, b;
            const rgbMatch = color.match(/rgba?\(([^,]+),([^,]+),([^,]+)/);
            
            if (rgbMatch) {
                r = parseInt(rgbMatch[1].trim());
                g = parseInt(rgbMatch[2].trim());
                b = parseInt(rgbMatch[3].trim());
            } else {
                r = 15; g = 255; b = 15; // 默认值
            }
            
            // 创建一个新的样式标签来更新按钮颜色
            let buttonColorStyle = document.getElementById('button-color-style');
            if (!buttonColorStyle) {
                buttonColorStyle = document.createElement('style');
                buttonColorStyle.id = 'button-color-style';
                document.head.appendChild(buttonColorStyle);
            }
            
            // 更新按钮颜色样式
            buttonColorStyle.textContent = `
                .visible-toggle .ai-core {
                    background: rgba(${r}, ${g}, ${b}, 0.9) !important;
                    box-shadow: 0 0 10px rgba(${r}, ${g}, ${b}, 0.8) !important;
                }
                
                .visible-toggle .ai-ring {
                    border-color: rgba(${r}, ${g}, ${b}, 0.6) !important;
                }
                
                .visible-toggle .ai-pulse {
                    background: rgba(${r}, ${g}, ${b}, 0.15) !important;
                }
                
                .visible-toggle {
                    box-shadow: 0 0 15px rgba(${r}, ${g}, ${b}, 0.3), 0 0 5px rgba(255, 255, 255, 0.2) !important;
                }
                
                .visible-toggle:hover {
                    box-shadow: 0 0 20px rgba(${r}, ${g}, ${b}, 0.5) !important;
                }
            `;
        }
        
        // 初始化按钮颜色
        const initialCardColor = 'rgba(255, 215, 0, 0.75)'; // 直接使用金黄色
        
        updateButtonColor(initialCardColor);
        
        // 点击切换背景显示/隐藏
        visibleButton.addEventListener('click', function() {
            const backgroundContainer = document.querySelector('.background-container');
            if (backgroundContainer) {
                if (backgroundContainer.style.display === 'none') {
                    // 显示背景，开启状态，使用红色
                    backgroundContainer.style.display = 'block';
                    visibleButton.setAttribute('data-state', 'on');
                    
                    // 添加按钮状态样式 - 固定红色
                    visibleButton.querySelector('.ai-core').style.background = 'rgba(255, 60, 60, 0.9)';
                    visibleButton.querySelector('.ai-pulse').style.background = 'rgba(255, 60, 60, 0.15)';
                    visibleButton.querySelectorAll('.ai-ring').forEach(ring => {
                        ring.style.borderColor = 'rgba(255, 60, 60, 0.7)';
                        ring.style.boxShadow = '0 0 20px rgba(255, 60, 60, 0.6), 0 0 5px rgba(255, 60, 60, 0.9) inset';
                        ring.style.filter = 'blur(0.5px) brightness(1.3)';
                    });
                    
                    // 添加透明效果到应用容器
                    const appContainer = document.querySelector('.app-container');
                    if (appContainer) {
                        const previewContainer = document.querySelector('.preview-container');
                        if (previewContainer) {
                            previewContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                            previewContainer.style.backdropFilter = 'blur(5px)';
                        }
                    }
                } else {
                    // 隐藏背景，关闭状态，使用主题色
                    backgroundContainer.style.display = 'none';
                    visibleButton.setAttribute('data-state', 'off');
                    
                    // 重新检测当前主题色
                    const currentCardColor = detectCardColor();
                    const themeRGB = extractRGB(currentCardColor);
                    
                    // 更新全局CSS变量
                    document.documentElement.style.setProperty('--theme-color-rgb', themeRGB);
                    console.log('更新备用按钮主题色:', themeRGB);
                    
                    // 更新按钮状态样式，使用主题色
                    visibleButton.querySelector('.ai-core').style.background = `rgba(${themeRGB}, 0.9)`;
                    visibleButton.querySelector('.ai-pulse').style.background = `rgba(${themeRGB}, 0.15)`;
                    visibleButton.querySelectorAll('.ai-ring').forEach(ring => {
                        // 移除可能存在的默认样式
                        ring.style.removeProperty('border-color');
                        ring.style.borderColor = `rgba(${themeRGB}, 0.7)`;
                        ring.style.boxShadow = `0 0 20px rgba(${themeRGB}, 0.6), 0 0 5px rgba(${themeRGB}, 0.9) inset`;
                        ring.style.filter = 'blur(0.5px) brightness(1.3)';
                    });
                    
                    // 恢复应用容器背景
                    const appContainer = document.querySelector('.app-container');
                    if (appContainer) {
                        const previewContainer = document.querySelector('.preview-container');
                        if (previewContainer) {
                            previewContainer.style.backgroundColor = 'white';
                            previewContainer.style.backdropFilter = 'none';
                        }
                    }
                }
                
                // 还可以通过postMessage向iframe发送消息实现额外控制
                try {
                    const iframe = backgroundContainer.querySelector('iframe');
                    if (iframe && iframe.contentWindow) {
                        iframe.contentWindow.postMessage('toggle', '*');
                    }
                } catch(e) {
                    console.error('无法向代码流框架发送消息', e);
                }
            } else {
                console.error('找不到背景容器');
            }
        });
        
        // 添加到页面
        document.body.appendChild(visibleButton);
        console.log('已添加可见控制按钮');
    } else {
        console.log('控制按钮已存在，应用强制可见样式');
        existingButton.style.cssText = `
            position: fixed !important;
            bottom: 30px !important;
            right: 30px !important;
            width: 48px !important;
            height: 48px !important;
            z-index: 9999 !important;
            visibility: visible !important;
            opacity: 1 !important;
            display: flex !important;
        `;
    }
    
    // 监听颜色变化事件
    window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'themeUpdated') {
            console.log('收到主题更新，更新按钮颜色:', event.data.color);
            updateButtonColor(event.data.color);
        }
    });
}, 1000); 