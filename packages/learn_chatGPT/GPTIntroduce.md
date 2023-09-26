## 大模型学习笔记

**Temperature**：`temperature` 的参数值越小，模型就会返回越确定的一个结果。如果调高该参数值，大语言模型可能会返回更随机的结果，也就是说这可能会带来更多样化或更具创造性的产出。我们目前也在增加其他可能 token 的权重。在实际应用方面，对于质量保障（QA）等任务，我们可以设置更低的`temperature`值，以促使模型基于事实返回更真实和简洁的结果。 对于诗歌生成或其他创造性任务，你可以适当调高`temperature`参数值。

**Top_p**：同样，使用`top_p`（与`temperature`一起称为核采样的技术），可以用来控制模型返回结果的真实性。如果你需要准确和事实的答案，就把参数值调低。如果你想要更多样化的答案，就把参数值调高一些。

一般建议是改变其中一个参数就行，不用两个都调整。

**零样本提示（zero-shot prompting）**：即用户不提供任务结果相关的示范，直接提示语言模型给出任务相关的回答。某些大型语言模式有能力实现零样本提示，但这也取决于任务的复杂度和已有的知识范围。

**小样本提示**：目前业界普遍使用的还是更高效的_小样本提示（Few-shot Prompting）_范式，即用户提供少量的提示范例，如任务说明等。语言模型可以基于一些说明了解和学习某些任务，而小样本提示正好可以赋能上下文学习能力。


### 参考
1. [Google生成式AI科普教程](https://www.cloudskillsboost.google/journeys/118) 
2. [prompt工程指南](https://www.promptingguide.ai/zh)  
3. https://km.sankuai.com/page/1607779952
4. https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api
5. https://learnprompting.org/zh-Hans/docs/intro
