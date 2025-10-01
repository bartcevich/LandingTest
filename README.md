# React + TypeScript + Vite

## Стек технологий

- Приложение пишется на React + TypeScript + Vite. Используются React Hook Form, Redux для состояния формы , Framer Motion для анимации.

## Скрипты

yarn install Установите зависимости
yarn dev запустить приложение в dev-режиме.
yarn run build создать билд приложения.

Схема архитектуры приложения
src/
├── app/
│ ├── layout.tsx
│ ├── page.tsx
│ └── globals.css
├── assets/
│ └── images/
├── components/
│ ├── Header.tsx
│ ├── Promotion.tsx
│ ├── RegistrationForm.tsx
├── store/
│ ├── index.ts
│ └── formSlice.ts
└── hooks/
└── useAppDispatch.ts
