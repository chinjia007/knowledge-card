document.addEventListener('DOMContentLoaded', function() {
    // 初始化变量
    let currentMode = 'knowledge'; // 默认为知识点卡片模式
    let currentColor = 'theme-softpink'; // 默认为柔粉色高饱和度主题
    let currentLayout = '1'; // 默认布局样式
    let currentFont = 'font-default'; // 默认字体
    let moduleCount = 1; // 默认模块数量

    // 获取DOM元素
    const knowledgeModeBtn = document.getElementById('knowledge-mode');
    const quizModeBtn = document.getElementById('quiz-mode');
    const colorOptions = document.querySelectorAll('.color-option');
    const layoutOptions = document.querySelectorAll('.layout-option');
    const fontSelector = document.getElementById('font-selector');
    const addBlockBtn = document.getElementById('add-block');
    const removeBlockBtn = document.getElementById('remove-block');
    const cardContent = document.getElementById('card-content');
    const cardTitle = document.getElementById('card-title');
    const cardBody = document.getElementById('card-body');
    const cardIcon = document.querySelector('.card-icon i');
    const card = document.querySelector('.card');
    const exportBtn = document.getElementById('export-btn');

    // 初始化选中状态
    const defaultColorOption = document.querySelector(`.color-option[data-color="${currentColor}"]`);
    if (defaultColorOption) defaultColorOption.classList.add('selected');
    
    const defaultLayoutOption = document.querySelector(`.layout-option[data-layout="${currentLayout}"]`);
    if (defaultLayoutOption) defaultLayoutOption.classList.add('selected');
    
    // 设置默认布局
    cardBody.setAttribute('data-layout', currentLayout);
    card.classList.add(currentFont);
    card.classList.add(currentColor);
    
    // 添加卡片顶部和底部的内边距
    cardBody.style.paddingTop = '10px';
    cardBody.style.paddingBottom = '50px';
    
    // 创意标题设计和卡片背景装饰
    applyCreativeTitleStyle();
    addCardBackgroundDecorations();
    
    // 应用默认字体样式
    applyFont(currentFont);

    // 设置默认内容
    if (currentMode === 'knowledge') {
        cardContent.value = `标题: Python知识点卡片

模块1标题: 知识点描述
知识点内容：Python是一种高级编程语言，以其简洁、易读的语法而著称。
思考问题：Python相比其他语言有哪些优势？
小贴士：Python广泛应用于数据分析、人工智能和Web开发等领域。`;
    } else {
        cardContent.value = `标题: 测试题

题目1: Python的创始人是谁？
选项A: Guido van Rossum
选项B: James Gosling
选项C: Brendan Eich
选项D: Bjarne Stroustrup`;
    }

    // 根据内容更新卡片预览
    updateCardPreview();
    updateCardColors();

    // 模式切换事件
    knowledgeModeBtn.addEventListener('click', function() {
        currentMode = 'knowledge';
        knowledgeModeBtn.classList.add('active');
        quizModeBtn.classList.remove('active');
        cardBody.className = 'card-body knowledge-mode';
        cardBody.setAttribute('data-layout', currentLayout);
        
        // 保持卡片顶部和底部的内边距
        cardBody.style.paddingTop = '10px';
        cardBody.style.paddingBottom = '50px';
        
        // 更新图标
        cardIcon.className = 'fas fa-rocket';
        
        // 更新输入区内容
        cardContent.value = `标题: Python知识点卡片

模块1标题: 知识点描述
知识点内容：Python是一种高级编程语言，以其简洁、易读的语法而著称。
思考问题：Python相比其他语言有哪些优势？
小贴士：Python广泛应用于数据分析、人工智能和Web开发等领域。`;
        
        moduleCount = 1;
        updateCardPreview();
        
        // 确保应用标题样式和背景装饰
        applyCreativeTitleStyle();
        addCardBackgroundDecorations();
    });

    quizModeBtn.addEventListener('click', function() {
        currentMode = 'quiz';
        quizModeBtn.classList.add('active');
        knowledgeModeBtn.classList.remove('active');
        cardBody.className = 'card-body quiz-mode';
        cardBody.setAttribute('data-layout', currentLayout);
        
        // 保持卡片顶部和底部的内边距
        cardBody.style.paddingTop = '10px';
        cardBody.style.paddingBottom = '50px';
        
        // 更新图标
        cardIcon.className = 'fas fa-question-circle';
        
        // 更新输入区内容
        cardContent.value = `标题: 测试题

题目1: Python的创始人是谁？
选项A: Guido van Rossum
选项B: James Gosling
选项C: Brendan Eich
选项D: Bjarne Stroustrup`;
        
        moduleCount = 1;
        updateCardPreview();
        
        // 确保应用标题样式和背景装饰
        applyCreativeTitleStyle();
        addCardBackgroundDecorations();
    });

    // 配色方案事件
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            currentColor = this.getAttribute('data-color');
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            updateCardColors();
        });
    });

    // 排版样式事件
    layoutOptions.forEach(option => {
        option.addEventListener('click', function() {
            currentLayout = this.getAttribute('data-layout');
            layoutOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            // 更新卡片布局
            cardBody.setAttribute('data-layout', currentLayout);
            
            // 重新应用布局
            if (currentMode === 'knowledge') {
                applyKnowledgeLayout();
            } else {
                applyQuizLayout();
            }
        });
    });

    // 字体选择事件
    fontSelector.addEventListener('change', function() {
        // 获取新选择的字体值
        currentFont = this.value;
        
        // 移除之前的所有字体类
        Array.from(fontSelector.options).forEach(option => {
            card.classList.remove(option.value);
        });
        
        // 添加新的字体类
        card.classList.add(currentFont);
        
        // 应用新字体
        applyFont(currentFont);
        
        // 显示字体应用通知
        showNotification('字体已更改为' + this.options[this.selectedIndex].text, 'success');
    });

    // 增加模块事件
    addBlockBtn.addEventListener('click', function() {
        // 检查模块数量限制
        if (moduleCount >= 5) {
            showNotification('最多支持5个模块', 'warning');
            return;
        }
        
        moduleCount++;
        let newContent = '';
        
        if (currentMode === 'knowledge') {
            newContent = `
模块${moduleCount}标题: 知识点描述
知识点内容：请在这里输入知识点内容。
思考问题：相关的思考问题。
小贴士：有用的小贴士或提示。`;
        } else {
            newContent = `
题目${moduleCount}: 在这里输入题目？
选项A: 选项内容
选项B: 选项内容
选项C: 选项内容
选项D: 选项内容`;
        }
        
        cardContent.value += newContent;
        updateCardPreview();
    });

    // 删除模块事件
    removeBlockBtn.addEventListener('click', function() {
        if (moduleCount <= 1) {
            showNotification('至少需要保留1个模块', 'warning');
            return;
        }
        
        moduleCount--;
        
        // 根据当前模式找到相应模块的标记
        const contentLines = cardContent.value.split('\n');
        const searchKey = currentMode === 'knowledge' ? '模块' : '题目';
        const searchInclude = currentMode === 'knowledge' ? '标题' : ':';
        
        // 查找最后一个模块/题目的开始行
        let lastBlockIndex = -1;
        for (let i = contentLines.length - 1; i >= 0; i--) {
            if (contentLines[i].includes(searchKey) && contentLines[i].includes(searchInclude)) {
                lastBlockIndex = i;
                break;
            }
        }
        
        if (lastBlockIndex > -1) {
            cardContent.value = contentLines.slice(0, lastBlockIndex).join('\n');
            updateCardPreview();
        }
    });

    // 监听输入区内容变化
    cardContent.addEventListener('input', updateCardPreview);

    // 导出高清图片
    exportBtn.addEventListener('click', function() {
        // 显示加载提示和状态
        showNotification('正在生成图片，请稍候...', 'info');
        exportBtn.classList.add('loading');
        exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 导出中...';
        
        try {
            // 确认html2canvas存在
            if (typeof html2canvas === 'undefined') {
                throw new Error('html2canvas库未加载');
            }
            
            console.log('开始导出流程...');
            // 创建临时元素，用于生成图片
            const tempContainer = document.createElement('div');
            tempContainer.style.position = 'fixed'; // 改为fixed确保可见性
            tempContainer.style.top = '0';
            tempContainer.style.left = '0';
            tempContainer.style.width = '600px';
            tempContainer.style.height = 'auto';
            tempContainer.style.zIndex = '-9999'; // 使用负zIndex隐藏但保持渲染
            tempContainer.style.opacity = '0.01'; // 几乎不可见但仍然渲染
            tempContainer.style.backgroundColor = 'transparent'; // 确保容器背景透明
            tempContainer.className = 'export-container'; // 添加类名以便调试
            document.body.appendChild(tempContainer);
            
            // 克隆卡片
            const cardClone = card.cloneNode(true);
            cardClone.style.width = '600px';
            cardClone.style.boxShadow = 'none';
            cardClone.style.marginTop = '0';
            cardClone.style.marginLeft = '0';
            cardClone.style.marginRight = '0';
            cardClone.style.backgroundColor = 'transparent'; // 确保背景透明
            
            // 确保应用字体和主题
            cardClone.classList.add(currentFont);
            cardClone.classList.add(currentColor);
            
            // 添加到临时容器
            tempContainer.appendChild(cardClone);
            
            // 获取计算样式并应用
            const applyStyles = function(original, clone) {
                const style = window.getComputedStyle(original);
                clone.style.fontFamily = getFontFamily(currentFont);
                
                // 复制所有重要样式，包括背景
                const stylesToCopy = [
                    'color', 'borderRadius', 'border', 'padding', 
                    'backgroundColor', 'backgroundImage', 'background'
                ];
                
                stylesToCopy.forEach(prop => {
                    clone.style[prop] = style[prop];
                });
                
                // 不再根据主题类型进行特殊处理，保留原始渐变背景
                
                // 递归处理子元素
                Array.from(original.children).forEach((child, i) => {
                    if (clone.children[i]) {
                        applyStyles(child, clone.children[i]);
                    }
                });
            };
            
            // 应用样式
            applyStyles(card, cardClone);
            
            // 确保克隆卡片保留圆角边界
            const originalComputedStyle = window.getComputedStyle(card);
            cardClone.style.borderRadius = originalComputedStyle.borderRadius;
            cardClone.style.border = originalComputedStyle.border;
            cardClone.style.overflow = originalComputedStyle.overflow;
            
            // 在下一帧进行渲染以确保样式应用
            requestAnimationFrame(function() {
                // 处理可能导致问题的符号
                const contentElements = cardClone.querySelectorAll('.content-text');
                contentElements.forEach(element => {
                    // 确保内容文本正确显示
                    element.style.display = 'block';
                });
                
                // 全局样式覆盖
                const style = document.createElement('style');
                style.textContent = `
                    /* 确保内容文本正确显示 */
                    .content-text {
                        display: block !important;
                    }
                `;
                document.head.appendChild(style);
                
                html2canvas(cardClone, {
                    scale: 2,
                    backgroundColor: null, // 设置为null以允许透明背景
                    useCORS: true,
                    allowTaint: true,
                    logging: true,
                    foreignObjectRendering: true,
                    removeContainer: true,
                    x: 0,
                    width: 600,
                    ignoreElements: (element) => {
                        // 忽略可能会导致问题的元素
                        return false; // 默认不忽略任何元素
                    },
                    onclone: function(clonedDoc) {
                        // 确保所有样式都被正确应用
                        console.log('Canvas克隆完成，正在处理样式...');
                        const clonedCard = clonedDoc.querySelector('.card');
                        if (clonedCard) {
                            // 确保渐变样式被保留
                            clonedCard.classList.add(currentColor);
                            clonedCard.classList.add(currentFont);
                        }
                    }
                }).then(canvas => {
                    console.log('html2canvas完成，处理结果...');
                    try {
                        // 创建下载链接
                        const link = document.createElement('a');
                        link.download = `${cardTitle.textContent || '知识卡片'}.png`;
                        link.href = canvas.toDataURL('image/png');
                        document.body.appendChild(link);
                        link.click();
                        setTimeout(() => document.body.removeChild(link), 100);
                        
                        // 清理
                        document.body.removeChild(tempContainer);
                        exportBtn.classList.remove('loading');
                        exportBtn.innerHTML = '<i class="fas fa-file-export"></i> 导出为PNG';
                        
                        // 显示成功提示
                        showNotification('图片导出成功！', 'success');
                    } catch (error) {
                        console.error('处理画布结果错误:', error);
                        handleExportError(error);
                    }
                }).catch(error => {
                    console.error('html2canvas错误:', error);
                    document.body.removeChild(tempContainer);
                    handleExportError(error);
                });
            });
        } catch (error) {
            console.error('导出初始化错误:', error);
            handleExportError(error);
        }
    });
    
    // 处理导出错误的函数
    function handleExportError(err) {
        console.error('导出图片时出错:', err);
        
        // 还原按钮状态
        exportBtn.classList.remove('loading');
        exportBtn.innerHTML = '<i class="fas fa-file-export"></i> 导出为PNG';
        
        // 记录详细错误信息
        console.group('导出错误详情');
        console.error('错误类型:', err.name);
        console.error('错误消息:', err.message);
        console.error('堆栈跟踪:', err.stack);
        console.error('使用的主题:', currentColor);
        console.error('是否为渐变主题:', currentColor.includes('grad-'));
        console.groupEnd();
        
        // 显示详细错误提示
        let errorMessage = '导出图片失败';
        if (err && err.message) {
            if (err.message.includes('foreignObject') && currentColor.includes('grad-')) {
                errorMessage = '渐变背景导出失败，请查看控制台获取详细信息。正在尝试备用方法...';
                // 尝试使用备用方法
                setTimeout(() => {
                    tryAlternativeExport();
                }, 500);
            } else {
                errorMessage = `导出失败: ${err.message}`;
            }
        }
        showNotification(errorMessage, 'error');
        
        // 尝试重新加载html2canvas库
        if (typeof html2canvas === 'undefined') {
            try {
                const script = document.createElement('script');
                script.src = 'html2canvas.min.js';
                document.head.appendChild(script);
                showNotification('正在尝试重新加载html2canvas库...', 'info');
            } catch (e) {
                console.error('无法重新加载html2canvas:', e);
            }
        }
    }
    
    // 备用导出方法
    function tryAlternativeExport() {
        console.log('尝试备用导出方法...');
        showNotification('正在尝试备用导出方法...', 'info');
        
        try {
            // 记录导出信息
            console.log('当前主题:', currentColor);
            console.log('是否为渐变主题:', currentColor.includes('grad-'));
            
            // 获取卡片尺寸
            const cardRect = card.getBoundingClientRect();
            
            // 截取屏幕截图
            html2canvas(card, {
                scale: 2,
                backgroundColor: null, // 设置为null以允许透明背景
                useCORS: true,
                allowTaint: true,
                logging: false,
                x: cardRect.left,
                y: cardRect.top,
                width: cardRect.width,
                height: cardRect.height,
                onclone: function(clonedDoc) {
                    // 处理可能导致问题的符号
                    const contentElements = clonedDoc.querySelectorAll('.content-text');
                    contentElements.forEach(element => {
                        // 确保内容文本正确显示
                        element.style.display = 'block';
                    });
                    
                    // 全局样式覆盖
                    const style = document.createElement('style');
                    style.textContent = `
                        /* 确保内容文本正确显示 */
                        .content-text {
                            display: block !important;
                        }
                    `;
                    clonedDoc.head.appendChild(style);
                }
            }).then(canvas => {
                // 创建下载链接
                const link = document.createElement('a');
                link.download = `${cardTitle.textContent || '知识卡片'}.png`;
                link.href = canvas.toDataURL('image/png');
                document.body.appendChild(link);
                link.click();
                setTimeout(() => document.body.removeChild(link), 100);
                
                // 重置按钮
                exportBtn.classList.remove('loading');
                exportBtn.innerHTML = '<i class="fas fa-file-export"></i> 导出为PNG';
                
                // 显示成功提示
                showNotification('使用备用方法导出成功！', 'success');
            }).catch(err => {
                console.error('备用导出方法失败:', err);
                showNotification('备用导出方法也失败了，请尝试其他颜色主题', 'error');
                exportBtn.classList.remove('loading');
                exportBtn.innerHTML = '<i class="fas fa-file-export"></i> 导出为PNG';
            });
        } catch (err) {
            console.error('备用导出初始化错误:', err);
            showNotification('备用导出方法初始化失败', 'error');
            exportBtn.classList.remove('loading');
            exportBtn.innerHTML = '<i class="fas fa-file-export"></i> 导出为PNG';
        }
    }

    // 更新卡片预览函数
    function updateCardPreview() {
        const content = cardContent.value;
        const lines = content.split('\n');
        
        // 解析标题
        for (let line of lines) {
            if (line.startsWith('标题:')) {
                cardTitle.textContent = line.substring(3).trim();
                break;
            }
        }
        
        // 清空卡片内容
        cardBody.innerHTML = '';
        
        // 根据当前模式解析内容
        currentMode === 'knowledge' ? parseKnowledgeCard(lines) : parseQuizCard(lines);
        
        // 确保布局设置正确
        cardBody.setAttribute('data-layout', currentLayout);
        
        // 保持卡片顶部和底部的内边距
        cardBody.style.paddingTop = '10px';
        cardBody.style.paddingBottom = '50px';
        
        // 应用创意标题样式
        applyCreativeTitleStyle();
        
        // 添加背景装饰
        addCardBackgroundDecorations();
        
        // 更新颜色
        updateCardColors();
    }

    // 解析知识点卡片内容
    function parseKnowledgeCard(lines) {
        let currentModule = null;
        // 为小贴士保留单独的图标，但知识点不使用任何图标
        const tipIcons = ['lightbulb', 'star', 'magic', 'gift', 'heart'];
        
        lines.forEach(line => {
            const trimmedLine = line.trim();
            
            if (trimmedLine.startsWith('模块') && trimmedLine.includes('标题:')) {
                // 添加上一个模块到卡片
                if (currentModule) {
                    cardBody.appendChild(currentModule);
                }
                
                // 创建新模块
                currentModule = document.createElement('div');
                currentModule.className = 'module';
                currentModule.dataset.index = document.querySelectorAll('.module').length;
                
                const title = document.createElement('h3');
                title.textContent = trimmedLine.split(':')[1].trim();
                currentModule.appendChild(title);
            } else if (trimmedLine.startsWith('知识点内容：') && currentModule) {
                // 简单直接的纯文本实现，没有emoji
                const contentEl = document.createElement('p');
                contentEl.className = 'content-text';
                contentEl.textContent = trimmedLine.substring(6);
                
                // 只应用必要的样式
                contentEl.style.marginBottom = '20px';
                contentEl.style.lineHeight = '1.8';
                contentEl.style.color = '#444';
                contentEl.style.fontSize = '1.15rem';
                contentEl.style.padding = '15px 20px';
                contentEl.style.background = 'linear-gradient(to right, var(--theme-light) 0%, rgba(255, 255, 255, 0.8) 100%)';
                contentEl.style.borderRadius = '15px';
                contentEl.style.borderLeft = '4px solid var(--theme-accent)';
                
                currentModule.appendChild(contentEl);
            } else if (trimmedLine.startsWith('思考问题：') && currentModule) {
                const question = document.createElement('div');
                question.className = 'thinking';
                // 移除大脑图标，只保留文本内容
                question.innerHTML = '<span>' + trimmedLine.substring(5) + '</span>';
                currentModule.appendChild(question);
            } else if (trimmedLine.startsWith('小贴士：') && currentModule) {
                const tip = document.createElement('div');
                tip.className = 'note';
                // 移除随机图标，只保留文本内容
                tip.innerHTML = `<span>${trimmedLine.substring(4)}</span>`;
                currentModule.appendChild(tip);
            }
        });
        
        // 添加最后一个模块
        if (currentModule) {
            cardBody.appendChild(currentModule);
        }
        
        // 应用布局样式
        applyKnowledgeLayout();
    }

    // 应用知识点卡片的布局样式
    function applyKnowledgeLayout() {
        const modules = document.querySelectorAll('.module');
        
        // 重置所有模块的样式
        modules.forEach(module => {
            module.style.width = '';
            module.style.margin = '';
            module.style.float = '';
            module.style.marginLeft = '';
            module.style.marginRight = '';
            module.style.boxShadow = '';
            module.style.borderWidth = '';
        });
        
        // 应用当前布局
        if (currentLayout === '1') {
            // 默认垂直布局
            modules.forEach(module => {
                module.style.marginBottom = '20px';
            });
        } else if (currentLayout === '2') {
            // 垂直布局，交替边距
            modules.forEach((module, index) => {
                if (index % 2 === 0) {
                    module.style.marginRight = '5%';
                } else {
                    module.style.marginLeft = '5%';
                }
                module.style.marginBottom = '20px';
            });
        } else if (currentLayout === '3') {
            // 两列布局
            modules.forEach(module => {
                module.style.width = '47%';
                module.style.margin = '1.5%';
                module.style.float = 'left';
            });
            
            // 添加清除浮动的元素
            const clearfix = document.createElement('div');
            clearfix.style.clear = 'both';
            cardBody.appendChild(clearfix);
        } else if (currentLayout === '4' || currentLayout === '5') {
            // 加强边框或阴影
            modules.forEach(module => {
                if (currentLayout === '4') {
                    module.style.borderWidth = '2px';
                } else {
                    module.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }
                module.style.marginBottom = '20px';
            });
        }
    }

    // 解析测试题卡片内容
    function parseQuizCard(lines) {
        let currentQuestion = null;
        const icons = ['question-circle', 'puzzle-piece', 'lightbulb', 'star', 'bolt'];
        
        lines.forEach(line => {
            const trimmedLine = line.trim();
            
            if (trimmedLine.startsWith('题目') && trimmedLine.includes(':')) {
                if (currentQuestion) {
                    cardBody.appendChild(currentQuestion);
                }
                
                currentQuestion = document.createElement('div');
                currentQuestion.className = 'question';
                
                const title = document.createElement('div');
                title.className = 'question-title';
                
                // 移除随机图标，只保留题目文本
                title.innerHTML = trimmedLine;
                
                currentQuestion.appendChild(title);
                
                const options = document.createElement('div');
                options.className = 'options';
                currentQuestion.appendChild(options);
            } else if (trimmedLine.startsWith('选项') && currentQuestion) {
                const option = document.createElement('div');
                option.className = 'option';
                
                // 提取选项编号，支持数字(1-4)或字母(A-D)格式
                const optionMatch = trimmedLine.match(/选项([1-4]|[A-D])/);
                if (optionMatch) {
                    let optionLabel = optionMatch[1];
                    // 如果是数字，转换为对应字母
                    if (optionLabel >= '1' && optionLabel <= '4') {
                        const letterMap = {
                            '1': 'A',
                            '2': 'B',
                            '3': 'C',
                            '4': 'D'
                        };
                        optionLabel = letterMap[optionLabel];
                    }
                    
                    option.innerHTML = `<span class="option-number">${optionLabel}</span><span class="option-text">${trimmedLine.split(':')[1].trim()}</span>`;
                    
                    // 添加点击切换选中状态的事件
                    option.addEventListener('click', function() {
                        // 先移除同级所有选项的选中状态
                        const siblings = this.parentElement.querySelectorAll('.option');
                        siblings.forEach(sib => {
                            sib.classList.remove('selected');
                        });
                        
                        // 设置当前选项为选中状态
                        this.classList.add('selected');
                        
                        // 检查是否所有问题都已回答
                        checkAllAnswered();
                    });
                    
                    currentQuestion.querySelector('.options').appendChild(option);
                }
            }
        });
        
        // 添加最后一个问题
        if (currentQuestion) {
            cardBody.appendChild(currentQuestion);
        }
        
        // 应用布局样式
        applyQuizLayout();
    }
    
    // 应用测试题卡片的布局样式
    function applyQuizLayout() {
        const questions = document.querySelectorAll('.question');
        
        questions.forEach(question => {
            // 重置样式
            question.style.boxShadow = '';
            question.style.borderWidth = '';
            
            const options = question.querySelector('.options');
            options.style.display = '';
            options.style.gridTemplateColumns = '';
            options.style.gap = '';
            
            const optionEls = options.querySelectorAll('.option');
            optionEls.forEach(opt => {
                opt.style.width = '';
                opt.style.margin = '';
                opt.style.display = '';
                opt.style.flexDirection = '';
            });
            
            // 应用当前布局
            if (currentLayout === '1') {
                // 默认垂直布局
                options.style.display = 'grid';
                options.style.gap = '10px';
            } else if (currentLayout === '2') {
                // 两列布局
                options.style.display = 'grid';
                options.style.gridTemplateColumns = '1fr 1fr';
                options.style.gap = '15px';
            } else if (currentLayout === '3') {
                // 网格布局
                options.style.display = 'grid';
                options.style.gridTemplateColumns = 'repeat(2, 1fr)';
                options.style.gap = '15px';
                
                // 为选项添加更多样式
                optionEls.forEach(opt => {
                    opt.style.display = 'flex';
                    opt.style.flexDirection = 'column';
                    opt.style.alignItems = 'center';
                    opt.style.textAlign = 'center';
                    
                    // 增强选项编号样式
                    const optionNumber = opt.querySelector('.option-number');
                    if (optionNumber) {
                        optionNumber.style.fontWeight = 'bold';
                        optionNumber.style.fontSize = '1.1em';
                        optionNumber.style.display = 'block';
                        optionNumber.style.marginBottom = '5px';
                    }
                });
            } else if (currentLayout === '4' || currentLayout === '5') {
                // 加强边框或阴影
                if (currentLayout === '4') {
                    question.style.borderWidth = '2px';
                } else {
                    question.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }
                options.style.display = 'grid';
                options.style.gap = '10px';
            }
        });
    }
    
    // 更新卡片颜色
    function updateCardColors() {
        try {
            // 获取主题名称和可能的主题类
            const colorOption = document.querySelector('.color-option.selected');
            if (!colorOption) {
                console.warn('没有找到选中的颜色选项');
                return;
            }
            
            const themeClass = colorOption.getAttribute('data-color');
            if (!themeClass) {
                console.warn('颜色选项没有data-color属性');
                return;
            }
            
            const allThemeClasses = Array.from(document.querySelectorAll('.color-option'))
                .map(el => el.getAttribute('data-color'))
                .filter(Boolean); // 过滤掉null或undefined
            
            if (allThemeClasses.length === 0) {
                console.warn('没有找到有效的主题类');
                return;
            }
            
            // 更新需要应用主题的元素 - 移除装饰元素
            const elementsToUpdate = [
                document.querySelector('.card'),
                ...document.querySelectorAll('.option.selected'),
                ...document.querySelectorAll('.card .btn')
            ].filter(Boolean); // 过滤掉null或undefined
            
            // 应用主题
            elementsToUpdate.forEach(element => {
                if (!element) return;
                
                // 移除所有可能的主题
                allThemeClasses.forEach(cls => {
                    if (cls) element.classList.remove(cls);
                });
                
                // 添加当前主题
                if (themeClass) element.classList.add(themeClass);
            });
            
            console.log('主题颜色已更新:', themeClass);
        } catch (error) {
            console.error('更新卡片颜色时出错:', error);
        }
    }
    
    // 显示通知函数
    function showNotification(message, type = 'info') {
        // 移除所有已有的通知
        document.querySelectorAll('.notification').forEach(note => {
            note.remove();
        });
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // 设置图标
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'warning') icon = 'exclamation-triangle';
        if (type === 'error') icon = 'times-circle';
        
        notification.innerHTML = `<i class="fas fa-${icon}"></i><span>${message}</span>`;
        
        document.body.appendChild(notification);
        
        // 强制重绘
        notification.offsetHeight;
        
        // 显示通知
        notification.classList.add('show');
        
        // 自动关闭
        setTimeout(() => {
            notification.classList.remove('show');
            
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // 根据字体名称获取对应的font-family值
    function getFontFamily(fontClassName) {
        switch(fontClassName) {
            case 'font-msyh':
                return "'微软雅黑', 'Microsoft YaHei', sans-serif";
            case 'font-fangsong':
                return "'仿宋', 'FangSong', serif";
            case 'font-huakang':
                return "'华康圆体', 'HuaKangYuanTi', 'Microsoft JhengHei', sans-serif";
            case 'font-lishu':
                return "'隶书', 'LiSu', serif";
            case 'font-sans':
                return "'Helvetica Neue', Arial, sans-serif";
            case 'font-serif':
                return "'Georgia', 'Times New Roman', serif";
            case 'font-mono':
                return "'Consolas', 'Courier New', monospace";
            case 'font-rounded':
                return "'Varela Round', 'Comic Sans MS', sans-serif";
            case 'font-elegant':
                return "'Playfair Display', 'Times New Roman', serif";
            case 'font-handwriting':
                return "'Dancing Script', 'Brush Script MT', cursive";
            case 'font-creative':
                return "'Lobster', 'Impact', cursive";
            case 'font-modern':
                return "'Montserrat', 'Trebuchet MS', sans-serif";
            case 'font-tech':
                return "'Roboto Mono', 'Lucida Console', monospace";
            default:
                return "'Microsoft YaHei', Arial, sans-serif";
        }
    }
    
    // 应用字体到卡片和其所有子元素
    function applyFont(fontClassName) {
        const fontFamily = getFontFamily(fontClassName);
        card.style.fontFamily = fontFamily;
        
        const allElements = card.querySelectorAll('*');
        allElements.forEach(element => {
            element.style.fontFamily = fontFamily;
        });
    }
    
    // 检查是否所有问题都已回答
    function checkAllAnswered() {
        const questions = document.querySelectorAll('.question');
        const allAnswered = Array.from(questions).every(question => {
            return question.querySelector('.option.selected') !== null;
        });
        
        if (allAnswered && questions.length > 0) {
            // 假设每道题的第一个选项是正确答案（这里仅作演示）
            let correctCount = 0;
            
            Array.from(questions).forEach(question => {
                const selectedOption = question.querySelector('.option.selected');
                // 假设第一个选项是正确的
                const firstOption = question.querySelector('.option');
                if (selectedOption === firstOption) {
                    correctCount++;
                    selectedOption.classList.add('correct');
                }
            });
            
            const totalQuestions = questions.length;
            const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
            
            // 显示得分，根据得分率决定提示类型
            const type = correctCount >= totalQuestions / 2 ? 'success' : 'warning';
            showNotification(`得分: ${correctCount}/${totalQuestions} (${scorePercentage}%)`, type);
        }
    }

    // 创意标题设计函数
    function applyCreativeTitleStyle() {
        // 标题容器
        const titleContainer = document.querySelector('.card-header');
        if (!titleContainer) return;
        
        // 清除现有样式
        titleContainer.style = '';
        cardTitle.style = '';
        
        // 移除所有已有的装饰元素
        const decorElements = document.querySelectorAll('.card-decoration, .title-decoration');
        decorElements.forEach(el => el.remove());
        
        // 设置标题容器样式
        titleContainer.style.position = 'relative';
        titleContainer.style.padding = '25px 30px';
        titleContainer.style.paddingTop = '45px'; // 保留增加的上内边距
        titleContainer.style.borderRadius = '10px 10px 50% 50% / 10px 10px 20px 20px';
        titleContainer.style.marginBottom = '25px';
        titleContainer.style.textAlign = 'center'; // 居中对齐标题容器
        
        // 设置标题样式
        cardTitle.style.fontSize = '2em';
        cardTitle.style.fontWeight = 'bold';
        cardTitle.style.textAlign = 'center'; // 居中对齐文本
        cardTitle.style.padding = '10px 15px';
        cardTitle.style.margin = '5px auto'; // 居中放置
        cardTitle.style.display = 'inline-block';
        cardTitle.style.position = 'relative';
        
        // 移除左侧图标
        const cardIcon = document.querySelector('.card-icon');
        if (cardIcon) {
            cardIcon.style.display = 'none';
        }
        
        // 设置分隔线样式，但移除装饰点
        const cardDivider = document.querySelector('.card-divider');
        if (cardDivider) {
            cardDivider.innerHTML = ''; // 清除所有子元素，包括装饰点
            cardDivider.style = '';
            cardDivider.style.height = '3px';
            cardDivider.style.background = 'linear-gradient(to right, transparent, currentColor, transparent)';
            cardDivider.style.margin = '15px auto 25px';
            cardDivider.style.width = '60%';
            cardDivider.style.borderRadius = '3px';
        }
    }

    // 添加卡片背景装饰函数
    function addCardBackgroundDecorations() {
        // 装饰功能已移除，但保留函数以避免调用错误
        // 清除任何可能存在的旧装饰元素
        const existingDecorations = card.querySelectorAll('.card-bg-decoration');
        existingDecorations.forEach(el => el.remove());
    }
});
