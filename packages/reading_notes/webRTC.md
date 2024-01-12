## 学习webRTC

### WebRTC中的MediaStreamConstraints字段含义

在WebRTC中，`MediaStreamConstraints`对象用于指定`getUserMedia`方法调用时对媒体输入和输出设备的要求。以下是`MediaStreamConstraints`对象的字段及其含义：

#### 1. video
指定视频相关的约束条件。可以是布尔值或者对象。如果是`true`，则表示请求任何可用的视频设备。如果是对象，可以指定更详细的约束条件，如分辨率、帧率等。

#### 2. audio
指定音频相关的约束条件。与视频类似，可以是布尔值或者对象。如果是`true`，则表示请求任何可用的音频设备。如果是对象，可以指定更详细的约束条件，如采样率、声道数等。

#### 3. peerIdentity
这个字段是一个字符串，用于指定一个DOMString，要求生成的媒体流与指定的peerIdentity关联起来。这通常用于确保媒体流的安全性，使得流只能被带有特定身份的对等体使用。

#### 4. videoConstraints（非标准字段）
- `width`: 视频宽度的约束，可以是具体数值或者包含最小值、最大值和理想值的对象。
- `height`: 视频高度的约束，同样可以是具体数值或者包含最小值、最大值和理想值的对象。
- `aspectRatio`: 视频宽高比的约束，通常是一个浮点数。
- `frameRate`: 帧率的约束，可以是具体数值或者包含最小值、最大值和理想值的对象。
- `facingMode`: 摄像头朝向的约束，常用的值包括"user"（前置摄像头）、"environment"（后置摄像头）、"left"、"right"等。

#### 5. audioConstraints（非标准字段）
- `volume`: 音量的约束，可以是具体数值或者包含最小值、最大值和理想值的对象。
- `echoCancellation`: 是否启用回声消除的布尔值。
- `autoGainControl`: 是否启用自动增益控制的布尔值。
- `noiseSuppression`: 是否启用噪声抑制的布尔值。
- `latency`: 延迟的约束，可以是具体数值或者包含最小值、最大值和理想值的对象。
- `channelCount`: 声道数的约束，可以是具体数值或者包含最小值、最大值和理想值的对象。
- `sampleRate`: 采样率的约束，可以是具体数值或者包含最小值、最大值和理想值的对象。
- `sampleSize`: 采样大小的约束，可以是具体数值或者包含最小值、最大值和理想值的对象。

注意，`videoConstraints`和`audioConstraints`并非`MediaStreamConstraints`的标准字段，而是为了解释可能出现在视频和音频对象约束中的属性。实际使用时，这些属性应直接嵌入到`video`或`audio`字段的对象中。


### 参考
1. [mdn的getUserMedia](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia)
