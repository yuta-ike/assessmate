
# 概要
[サポーターズ ウインターハッカソン](https://talent.supporterz.jp/events/844bffbc-c15f-4b1f-b787-b124557d1d0a/)で作成したプロダクトです
🎉🎉🎉🎉 最優秀賞をいただくことができました！！！！ 🎉🎉🎉🎉

[デモ動画](https://drive.google.com/file/d/1KANVvRaWY6mwukMgYriUne6UHl5JoA9s/view?usp=sharing)

## ASESSMATE
### コンセプト
「自習 × TECH」

中高生をターゲットにした、英語学習支援&共有サービス。LINE Botに教科書本文の写真を送ると、自動で教材を生成してくれます。生成した教材を友達とシェアし、共同ノートとしてコメントやアドバイスなどを書き合うことができます。

### ターゲット
テスト勉強をする中学生・高校生。

### 解決する課題
友達同士でのノートの見せ合いや教え合いを効率的に行いたい。現在ではノートを写真に撮って送るなどの方法しかなく効率的とは言えない。

このサービスでは友達との共有を前提とした教材の「**ベース**」を生成し、友達間での教え合いに使うことができる。また、「テストに出そう！」「スペル注意！」などの知見を貯めることができる。

### 現時点で実装している機能（ハッカソン終了時点）
- LINE Botに英文の画像を送ると、①品詞ごとにカラーリングしたテキスト、②センテンスごとの日本語訳、③文章中に含まれる単語を集めた単語帳（単語の品詞&日本語訳） を自動生成します。
- 単語帳を使って勉強できます。単語帳には、①単語 ②単語の日本語訳 ③単語の品詞 **④その単語を含む教科書中の文章 ⑤④の日本語訳** が含まれます。また単語の音声再生機能もあります。
- 教材を友達にシェアできます。シェアした友達同士で、①単語帳の単語 ②本文のセンテンス ごとにコメントのやりとりができます。例えば「この単語テストに出そう！」「スペルに注意！」や、「ここの文章構造難しい！」など、アドバイスや注意点を共有できます。友達と一緒にノートを作る感覚です。

### 今後実装したい機能（構想）
- LINE Botとのチャット画面上で単語テストを行う機能（現在はURLを踏んでWebアプリ上で行えるが、LINEのトーク画面でも行えるようにしたい）
- 英語以外の教科にも対応したい

### 実装できなかったこと
- 日本語訳・品詞分解の精度向上（現時点では間違いや不自然な部分が多く実用に耐えない）
- 画像認識や日本語訳が間違っている場合の修正（現在は修正不可能）
- 画像だけでなく英文を直接送る方法にも対応（現時点では画像を送って教材を生成する飲み）
- 単語帳の単語の追加・削除・編集機能
- LINEで繋がっている友達にのみ共有可能にする（現在はURLを知っている全員が教材にアクセス可能）

### アピールポイント

#### 中高生が間違いなく使っている（であろう）LINEをインタフェースとして採用
現在でも友達同士での宿題の教え合いや見せ合いはLINE上で行われておりサービスとの相性が良い。加えて、LIFFを利用することでログイン操作不要で導入できるため、共有サービスでありがちな「友達が登録していないので使い道がない」現象を避けることができる。
また、LINEの友達の繋がりはある程度クローズドであるため、

## ハッカソン
- 制作期間：4日間
- 

後ほど追記予定....

