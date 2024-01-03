# react-r3f-tutorial020
React+TypeScriptなWebアプリで、R3Fのtutorial20。(Lerpで簡単移動処理) 簡単な移動処理を攻略する。

![](https://storage.googleapis.com/zenn-user-upload/1c62919c59bd-20240103.png)

# ポイント
## 1. <Rig />関数コンポーネント
この関数で空間全体の姿勢を変更している。
<br/>実際は、全体Cameraの位置を変更-> (0,0,0)位置を向くように再計算する。
```ts:<Rig/>
camera.position.lerp(vec, 0.025)
camera.lookAt(0, 0, 0)
```

## 2. <Button />関数コンポーネント
meshタグにonPointerDown/onPointerOver/onPointerOutをくっつけて、イベント制御する。
<br/>各イベントで各変数を変更して、useFrame()の中で、各変数値に合わせてButton自身の位置と色を変更する。
<br/>色を変更するためには、meshの参照でなく、meshPhysicalMaterialの参照を保持っとく必要があるので、refMatに設定している。
