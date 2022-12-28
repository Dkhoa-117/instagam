# <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png?20200512141346" alt="instagram" width="24"/> instagram clone

Building an Instagram app with <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="drawing" width="18"/>

## Mục lục

- [About this Project](#about-this-project)
  - [🌟 Các chức năng](#🌟-các-chức-năng)
  - [📁 Files tree](#📁-files-tree)
- [Quá trình triển khai](#how-to-do-it)
- [📦 Các Dependencies sử dụng](#📦-các-dependencies-sử-dụng)
- [Demo](#demo)

## About this Project

Sử dụng `Firebas Firestore & Authentication` để lưu trữ dữ liệu và xác thực người dùng. \
Dùng `redux` để quản lý trạng thái của người dùng trong ứng dụng (đã đăng nhập hay chưa) và fetch dữ liệu người dùng cho container khi đã đăng nhập. \
Dùng _camera_ và _image-picker_ của `expo` để sử dụng máy ảnh cũng như truy cập vào thư viện ảnh của thiết bị. \
`reacr-navigation` được sử dụng cho các tác vụ chuyển hướng trong ứng dụng.\
Lưu cái bài đăng vào `Firebase Storage` và `Firestore` (khúc này chắc phải bắt đầu format thôi)\
Triển khai search người dùng (search trên firestore), và hiển thị profile theo user state (dùng redux).\
Triển khai logic follow & unfollow bằng cách sử dụng snapshot `firestore` và `redux` để cập nhật trạng thái. \
Load new feed cho người dùng dựa vào state của users và posts mà currentUser đang follow. Tạo một reducer mới và fetch post và user data khi có cập nhật ở danh sách following.\

### 🌟 Các chức năng

- Các chức năng chính của một mạng xã hội: Account, New Feed, Profile,...
- 📸 Đăng ảnh kèm caption.
- 🔎 Tìm kiếm người dùng khác.
- Tương tác giữa các người dùng: ♥️ like ảnh, 📬 commment, 🏷️ tag nhau, follow...

### 📁 Files tree

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
│       ├── Profile.js
│       ├── Save.js
│       └── Search.js
├── firebase
│   └── index.js
├── package-lock.json
├── package.json
└── redux
    ├── actions
    │   └── index.js
    ├── constants
    │   └── index.js
    └── reducers
        ├── index.js
        ├── user.js
        └── users.js
```

## How to do it

## 📦 Các Dependencies sử dụng

- [@react-navigation/material-bottom-tabs](https://reactnavigation.org/docs/material-bottom-tab-navigator/)
- [@react-navigation/native & @react-navigation/native-stack](https://reactnavigation.org/docs/getting-started/)
- [firebase](https://firebase.google.com/docs/web/setup)
- [@reduxjs/toolkit & redux-react & redux](https://redux-toolkit.js.org/tutorials/quick-start)
- [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [expo-camera](https://docs.expo.dev/versions/latest/sdk/camera/)

## Demo

[<img src="https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png" alt="youtube" width="22"/>]()
