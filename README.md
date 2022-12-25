# <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png?20200512141346" alt="instagram" width="24"/> instagram clone

Building an Instagram app with <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="drawing" width="18"/>

## About this Project

Sử dụng `Firebas Firestore & Authentication` để lưu trữ dữ liệu và xác thực người dùng. \
Dùng `redux` để quản lý trạng thái của người dùng trong ứng dụng (đã đăng nhập hay chưa) và fetch dữ liệu người dùng cho container khi đã đăng nhập. \
Dùng _camera_ và _image-picker_ của `expo` để sử dụng máy ảnh cũng như truy cập vào thư viện ảnh của thiết bị. \
`reacr-navigation` được sử dụng cho các tác vụ chuyển hướng trong ứng dụng.\
Lưu cái bài đăng vào `Firebase Storage` và `Firestore` (khúc này chắc phải bắt đầu format thôi)

## How to do it

## Dependencies using in this project:

- [@react-navigation/material-bottom-tabs](https://reactnavigation.org/docs/material-bottom-tab-navigator/)
- [@react-navigation/native & @react-navigation/native-stack](https://reactnavigation.org/docs/getting-started/)
- [firebase](https://firebase.google.com/docs/web/setup)
- [@reduxjs/toolkit & redux-react & redux](https://redux-toolkit.js.org/tutorials/quick-start)
- [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [expo-camera](https://docs.expo.dev/versions/latest/sdk/camera/)

## Demo

[<img src="https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png" alt="youtube" width="22"/>]()

## Files

```
.
├── App.js
├── README.md
├── app.json
├── babel.config.js
├── components
│   ├── Main.js
│   ├── auth
│   │   ├── Landing.js
│   │   ├── Login.js
│   │   └── Register.js
│   └── main
│       ├── Add.js
│       ├── Feed.js
│       └── Profile.js
├── firebase
│   └── index.js
├── package-lock.json
├── package.json
└── redux
    ├── actions
    │   └── index.js
    ├── constants
    │   └── index.js
    ├── reducers
    │   ├── index.js
    │   └── user.js
    └── store
        └── index.js
```
