# 紧急按钮恢复指南 - 强化版圆形光波

如果您在页面上看不到控制按钮，可以使用紧急恢复脚本来恢复按钮的可见性。此版本特别增强了圆形光波效果，使其更加明显。

## 使用方法

1. 打开浏览器的开发者工具：
   - Chrome/Edge: 按 F12 或 Ctrl+Shift+I (Windows) / Cmd+Option+I (Mac)
   - Firefox: 按 F12 或 右键点击页面并选择"检查元素"
   - Safari: 先在偏好设置中启用开发者菜单，然后按 Cmd+Option+I

2. 切换到"控制台"(Console)标签

3. 复制以下代码并粘贴到控制台中：

```javascript
// 紧急按钮恢复代码 - 强化版圆形光波
(function() {
    console.log('执行紧急按钮恢复检查');
    let anyVisibleButton = document.querySelector('.ai-toggle');
    
    if (!anyVisibleButton || getComputedStyle(anyVisibleButton).display === 'none' || getComputedStyle(anyVisibleButton).visibility === 'hidden') {
        console.log('未检测到可见按钮，创建紧急按钮');
        
        // 创建一个简单但明显的按钮
        const emergencyButton = document.createElement('div');
        emergencyButton.id = 'emergency-toggle-button';
        emergencyButton.innerHTML = `
            <div class="em-core"></div>
            <div class="em-ring em-ring1"></div>
            <div class="em-ring em-ring2"></div>
            <div class="em-ring em-ring3"></div>
        `;
        
        // 使用内联样式确保可见性
        emergencyButton.style.cssText = `
            position: fixed !important;
            bottom: 30px !important;
            right: 30px !important;
            width: 60px !important;
            height: 60px !important;
            border-radius: 50% !important;
            background-color: rgba(0, 0, 0, 0.8) !important;
            box-shadow: 0 0 20px rgba(255, 60, 60, 0.5) !important;
            z-index: 99999 !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        `;
        
        // 添加动画和样式 - 增强版圆形光波
        const emergencyStyle = document.createElement('style');
        emergencyStyle.textContent = `
            /* 核心样式 */
            #emergency-toggle-button .em-core {
                width: 24px;
                height: 24px;
                background-color: rgb(255, 60, 60);
                border-radius: 50%;
                position: relative;
                z-index: 2;
                box-shadow: 0 0 15px rgba(255, 60, 60, 0.8);
                animation: em-pulse 2s infinite;
            }
            
            /* 圆环共同样式 */
            #emergency-toggle-button .em-ring {
                position: absolute;
                border-radius: 50%;
                border: 2px solid rgba(255, 60, 60, 0.8);
                box-shadow: 0 0 10px rgba(255, 60, 60, 0.4);
                pointer-events: none;
                z-index: 1;
            }
            
            /* 圆环1 - 最小的环 */
            #emergency-toggle-button .em-ring1 {
                width: 36px;
                height: 36px;
                animation: em-wave 3s infinite ease-out;
                animation-delay: 0s;
            }
            
            /* 圆环2 - 中等大小的环 */
            #emergency-toggle-button .em-ring2 {
                width: 48px;
                height: 48px;
                animation: em-wave 3s infinite ease-out;
                animation-delay: 0.5s;
            }
            
            /* 圆环3 - 最大的环 */
            #emergency-toggle-button .em-ring3 {
                width: 60px;
                height: 60px;
                animation: em-wave 3s infinite ease-out;
                animation-delay: 1s;
            }
            
            /* 核心脉动动画 */
            @keyframes em-pulse {
                0% { transform: scale(1); box-shadow: 0 0 15px rgba(255, 60, 60, 0.8); }
                50% { transform: scale(0.9); box-shadow: 0 0 20px rgba(255, 60, 60, 1); }
                100% { transform: scale(1); box-shadow: 0 0 15px rgba(255, 60, 60, 0.8); }
            }
            
            /* 波纹扩散动画 */
            @keyframes em-wave {
                0% {
                    transform: scale(0.8);
                    opacity: 0.9;
                    border-width: 3px;
                }
                70% {
                    opacity: 0.3;
                    border-width: 2px;
                }
                100% {
                    transform: scale(2);
                    opacity: 0;
                    border-width: 1px;
                }
            }
        `;
        document.head.appendChild(emergencyStyle);
        
        // 添加点击事件
        emergencyButton.addEventListener('click', function() {
            const backgroundContainer = document.querySelector('.background-container');
            if (backgroundContainer) {
                if (backgroundContainer.style.display === 'none') {
                    backgroundContainer.style.display = 'block';
                    this.querySelector('.em-core').style.backgroundColor = 'rgb(255, 60, 60)';
                    this.querySelector('.em-core').style.boxShadow = '0 0 15px rgba(255, 60, 60, 0.8)';
                    
                    // 更新圆环为红色
                    document.querySelectorAll('#emergency-toggle-button .em-ring').forEach(ring => {
                        ring.style.borderColor = 'rgba(255, 60, 60, 0.8)';
                        ring.style.boxShadow = '0 0 10px rgba(255, 60, 60, 0.4)';
                    });
                } else {
                    backgroundContainer.style.display = 'none';
                    this.querySelector('.em-core').style.backgroundColor = 'rgb(60, 255, 60)';
                    this.querySelector('.em-core').style.boxShadow = '0 0 15px rgba(60, 255, 60, 0.8)';
                    
                    // 更新圆环为绿色
                    document.querySelectorAll('#emergency-toggle-button .em-ring').forEach(ring => {
                        ring.style.borderColor = 'rgba(60, 255, 60, 0.8)';
                        ring.style.boxShadow = '0 0 10px rgba(60, 255, 60, 0.4)';
                    });
                }
            } else {
                alert('找不到背景容器，请刷新页面重试');
            }
        });
        
        // 添加到页面
        document.body.appendChild(emergencyButton);
        console.log('已添加紧急按钮');
        
        // 确保动画可见 - 强制重绘
        setTimeout(() => {
            emergencyButton.style.transform = 'translateZ(0)';
            console.log('强制重绘按钮以确保动画可见');
        }, 100);
    } else {
        // 如果按钮存在但不可见，尝试修复其样式并添加强化版圆形光波效果
        console.log('检测到按钮，尝试修复其可见性并更新为强化版圆形光波效果');
        
        // 首先，修复按钮可见性
        anyVisibleButton.style.cssText = `
            position: fixed !important;
            bottom: 30px !important;
            right: 30px !important;
            width: 60px !important;
            height: 60px !important;
            border-radius: 50% !important;
            background-color: rgba(5, 10, 20, 0.8) !important;
            box-shadow: 0 0 20px rgba(255, 60, 60, 0.5) !important;
            z-index: 99999 !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            opacity: 1 !important;
            visibility: visible !important;
            transform: translateZ(0) !important;
        `;
        
        // 其次，添加强化版圆形光波效果样式
        const enhancedWaveStyle = document.createElement('style');
        enhancedWaveStyle.id = 'enhanced-wave-style';
        enhancedWaveStyle.textContent = `
            /* 确保原有光波不显示 */
            .ai-toggle .ai-ring {
                display: none !important;
            }
            
            /* 添加新的圆环元素 */
            .ai-toggle::before,
            .ai-toggle::after,
            .ai-toggle .ai-core::before {
                content: '';
                position: absolute;
                border-radius: 50%;
                border: 2px solid rgba(var(--theme-color-rgb), 0.8);
                box-shadow: 0 0 10px rgba(var(--theme-color-rgb), 0.4);
                pointer-events: none;
                opacity: 0;
                z-index: 1;
            }
            
            /* 三个不同大小的圆环 */
            .ai-toggle::before {
                width: 36px;
                height: 36px;
                animation: ai-enhanced-wave 3s infinite ease-out;
                animation-delay: 0s;
            }
            
            .ai-toggle::after {
                width: 48px;
                height: 48px;
                animation: ai-enhanced-wave 3s infinite ease-out;
                animation-delay: 0.5s;
            }
            
            .ai-toggle .ai-core::before {
                width: 60px;
                height: 60px;
                animation: ai-enhanced-wave 3s infinite ease-out;
                animation-delay: 1s;
            }
            
            /* 波纹扩散动画 */
            @keyframes ai-enhanced-wave {
                0% {
                    transform: scale(0.8);
                    opacity: 0.9;
                    border-width: 3px;
                }
                70% {
                    opacity: 0.3;
                    border-width: 2px;
                }
                100% {
                    transform: scale(2);
                    opacity: 0;
                    border-width: 1px;
                }
            }
            
            /* 状态样式 */
            [data-state="on"]::before,
            [data-state="on"]::after,
            [data-state="on"] .ai-core::before {
                border-color: rgba(255, 60, 60, 0.8) !important;
                box-shadow: 0 0 10px rgba(255, 60, 60, 0.4) !important;
            }
            
            [data-state="off"]::before,
            [data-state="off"]::after,
            [data-state="off"] .ai-core::before {
                border-color: rgba(var(--theme-color-rgb), 0.8) !important;
                box-shadow: 0 0 10px rgba(var(--theme-color-rgb), 0.4) !important;
            }
        `;
        document.head.appendChild(enhancedWaveStyle);
        
        console.log('已更新为强化版圆形光波效果');
        
        // 强制重绘以确保动画可见
        setTimeout(() => {
            anyVisibleButton.style.transform = 'translateZ(0)';
            anyVisibleButton.style.animation = 'none';
            setTimeout(() => {
                anyVisibleButton.style.animation = '';
            }, 10);
            console.log('强制重绘按钮以确保动画可见');
        }, 100);
    }
})();
```

4. 按下回车键执行代码

5. 页面右下角应该会出现一个按钮：
   - 按钮周围有更加明显的发光圆形光波效果
   - 光波效果包括三个不同大小的圆环，形成连续的扩散波纹
   - 圆环带有发光效果，使其在任何背景下都清晰可见

## 强化版光波效果特点

- **更明显的光波**：增加了圆环的可见性，添加了阴影效果使光波在任何背景下都清晰可见
- **改进的动画参数**：更自然的扩散动画，带有渐变效果
- **多层次光环**：三层不同尺寸的光环以不同延迟扩散，创造连续的波纹效果
- **发光边框**：边框带有发光效果，增强视觉吸引力
- **强制重绘机制**：确保在所有浏览器中动画都能正确显示

## 故障排除

如果执行代码后仍然没有看到按钮或光波效果，尝试以下方法：

1. 确保没有使用任何广告拦截器或内容拦截器
2. 尝试使用不同的浏览器（Chrome通常效果最佳）
3. 刷新页面后再次执行脚本
4. 检查控制台是否有错误信息，如果有，请截图并反馈

## 注意事项

- 此脚本不会持久保存，如果刷新页面，您需要再次执行脚本
- 脚本仅用于恢复控制按钮，不会影响页面其他功能
- 强化版光波效果使用了较多CSS动画，可能在性能较低的设备上略有卡顿 