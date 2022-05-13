# gulp-settings-v4

## Описание

* нет сжатия картинок
* нет минификации HTML, CSS, JS
* нет конкатенации CSS и JS
* есть сборка в режимах Отладка и Сборка
* есть преобразование SCSS в CSS
* есть перенос файлов Fonts, Scripts, CSS, Images

## Параметры

```
> node -v
v16.15.0

> npm -v
7.0.0
```

## Плагины

```
npm i node-sass gulp-sass -D    // sass/scss компилятор
npm i browser-sync -D           // сервер для живой отладки в браузере
npm i gulp-notify -D            // проверка sass/scss
npm i gulp-concat -D            // объединение файлов
npm i del -D                    // удаление файлов
```
