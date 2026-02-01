# Список API проекта
Ниже приведен полный список API endpoint-ов, найденных в backend проекте.

## Аутентификация (Authentication)
- **POST** `/api/token/` - Получение токена (Login)
- **POST** `/api/token/refresh/` - Обновление токена

## Публичные API (Public)
Эти API доступны для всех пользователей (обычно Read-Only).

### Профиль и Пользователи
- `/api/users/get-me` - Информация о текущем пользователе

### Новости и Медиа
- `/api/news/list/` - Список новостей
- `/api/news/detail/<id>/` - Детальная информация о новости
- `/api/news/search/` - Поиск новостей
- `/api/news/header/list/` - Новости для хедера
- `/api/news/date-filter/` - Фильтрация по дате
- `/api/news/most_read/list/` - Самые читаемые новости
- `/api/posts/list/category/<id>/` - Список постов по категории
- `/api/posts/detail/<pk>/` - Детальная информация о посте
- `/api/youtube/list/` - Список видео
- `/api/youtube/detail/<pk>/` - Детали видео
- `/api/youtube/header/list/` - Видео для хедера
- `/api/banner/list/` - Список баннеров
- `/api/banner/detail/<pk>/` - Детали баннера

### Структура и Организация
- `/api/workers/list/` - Список сотрудников
- `/api/workers/detail/<pk>/` - Детали сотрудника
- `/api/tuzilma/list/` - Список структур
- `/api/tuzilma/detail/<pk>/` - Детали структуры
- `/api/maqsad/list/` - Список целей (Targets)
- `/api/maqsad/detail/<pk>/` - Детали цели
- `/api/bolimlar/list/` - Список отделов
- `/api/bolimlar/detail/<pk>/` - Детали отдела
- `/api/local-council/list/` - Список местных советов

### Разное
- `/api/navbar/list/` - Элементы навигации
- `/api/interactive-map/list/` - Данные для интерактивной карты
- `/api/elon/list/` - Список объявлений (Elon)
- `/api/elon/detail/<pk>/` - Детали объявления
- `/api/links/list/` - Список ссылок

---

## Админ API (Admin)
Эти API используются для управления контентом и требуют прав администратора.

- `/api/content` / `/api/content/` - Управление контентом
- `/api/maps/` - Управление картами
- `/api/users/` - Управление пользователями
- `/api/contact/` - Управление контактами
- `/api/admin/youtube/` - Управление видео
- `/api/leadership/` - Управление руководством
- `/api/organization/` - Управление организацией
- `/api/local-council/` - Управление местным советом (Admin)
- `/api/social-networks/` - Управление соцсетями
- `/api/sector-and-department/` - Управление секторами и отделами

## Документация
- `/documents/` - Redoc
- `/swagger/` - Swagger UI
