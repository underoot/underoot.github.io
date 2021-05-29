---
lang: ru
image: /images/20210529220000.jpg
description: >
  Недавно я наткнулся на странный ответ от Яндекса на достаточно простой вопрос
  "Сколько лет президенту Таджикистана". Я решил проверить: а насколько хорошо
  Яндекс знает возраста всех президентов мира. Результаты оказались весьма
  любопытними.
---

# О сколько мне открытий чудных готовит поисковый СЕРП

Недавно я задался для себя вопросом (только не спрашивайте как это
вышло): "Сколько лет президенту Таджикистана?". Я вбил в поисковую строчку на
телефоне у супруги свой запрос и получил странный ответ от Яндекса, которым
пользуется моя жена:

<blockquote class="twitter-tweet"><p lang="ru" dir="ltr">Не знаю зачем, но сегодня узнал что колдунщик Яндекса молодит президента Таджикистана на два года. Также не знаю зачем это знать вам — простите <a href="https://t.co/OjmApmhga5">pic.twitter.com/OjmApmhga5</a></p>&mdash; Aleksandr Shoronov (@underoot) <a href="https://twitter.com/underoot/status/1391509715583225857?ref_src=twsrc%5Etfw">May 9, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Я решил проверить службу поддержки Яндекса в действии и написал ей свою жалобу
на поисковую выдачу и получил ответ, а спустя меньше недели даже подтверждение
того, что мой запрос был исправлен. Когда я решил проверить результат я увидел,
что поисковая выдача дейстительно исправлена: быстрый ответ просто убрали и
добавили длинную цитату про президента Таджикистана из какого-то
Интернет-ресурса. "Ну ладно" — подумал я, но затем обратил внимание, что есть
более коротий ответ, который показывается еще не на СЕРП-е (Search Engine Result
Page — страница с результатами запросов), а просто под поисковой строкой и он на
момент написания статьи (29 мая 2021 года) до сих пор неправильный, хотя
дополнительный комментарий в переписке про вышеизложенную жалобу я давно
написал.

Но дальше меня посетило сильное и непреодолимое желание провести свое
программистское расследование: а что если вооружившись парой скриптов
попробовать собрать все возраста президентов стран, используя ту же самую
Википедию, и попробовать получить все результаты от Яндекса по возрастам.
Дело-то не пыльное, и я, разумеется, не долго думаю, приступил, несмотря на
сильное удивление со стороны супруги что подобная ерунда вообще кого-то может
интересовать.

Достаточно быстро "наклепав" скриптик, который вытащил мне [со страницы Википедии](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%B3%D0%BE%D1%81%D1%83%D0%B4%D0%B0%D1%80%D1%81%D1%82%D0%B2)
все страны мира, я отфильтровал их по наличию в них президентов (я решил
ограничиться только данными субъектами государственного управления, дабы сузить
свой круг поискового интереса). В процессе чтения результатов выполнения скрипта
сделал для себя множество чудных географических открытий: например, как часто в
новостях вы слышите про такие страны с необычными для слуха названиями как
Тринидад и Тобаго. Кстати, фильтрация по наличию форм правления государств с
президентом сделана была, возможно, достаточно наивно: просто взял и начал
искать по соответствующим страницам на Википедии упоминания в краткой информации
президента, но после ручной проверки результатов убедил себя в том, что вышло
достаточно достоверно.

Дальше, для формирования корректной с точки зрения русского языка поисковой
выдачи, для каждой страны, которая попала в финальный список, я решил поискать в
Викисловаре название этой страны в родительском падеже:
"Сколько лет президенту России", а не "Сколько лет президенту Россия". Уверен,
что поисковые системы поймую подобную топорную фразу, но я решил сделать мой
эксперимент более правдоподобным, более человечным, так сказать. Второй скрипт
написан и вот у меня уже есть все страны с нужной мне "поисковой" формой.

Затем, посредством все той же Википедии для каждой страны я вытащил возраст
президента для последующего сравнения. Сложно судить точно за достоверность
подобных данных, но, тем не менее, я решил считать написанное в Википедии
правдой и сравнивать в последующем результаты именно с этими данными. Скрипт
написан, а вот с результатом выполнения вышло много интересных оказий. Википедия
для страниц персон указывает помимо даты рождения еще и возраст на данный
момент, чем я успешно и воспользовался. Но для некоторых стран подобного
возраста просто не указывается. Как оказалось, например, [у президента республики
Науру](https://ru.wikipedia.org/wiki/%D0%AD%D0%BD%D0%B3%D0%B8%D0%BC%D0%B5%D0%B0,_%D0%9B%D0%B0%D0%B9%D0%BE%D0%BD%D0%B5%D0%BB) (есть такая страна, если вы не знали, в Океании) просто неизвестно
публичная точная дата рождения — известен только год. Что ж, с подобными данными
пришлось разбираться вручную, благо таких проблем было не очень много.

Так вот, теперь у нас есть все данные и теперь можно приступать к
непосредственным поисковым запросам. Для того, чтобы автоматизировать и данный
процесс я решил воспользоваться Headless браузером, а для его запуска
воспользовался не мало известным в узких кругах фреймворком
[Playwright](https://playwright.dev/). Написал максимально простой скрипт,
который делает непосредственно запрос и пытается определить ответ поисковой
системы, причем именно короткий и точный. Если поисковая система не может дать
точный ответ на поставленный вопрос, то я принимал решение, что система не может
мне помочь и ответ в моей системе оценки считается неверным. Кстати, если вы не
знали, но у Яндекса ответ или интерактивная форма, которая непосредственно
"отвечает" на поставленный вопрос называется "Колдунщик". Вот сейчас мы и
проверим силу магии интелектуальных поисковых систем. Для того, чтобы смотреть
на результаты было интересно и появилось большее ощущение азарта,
кроме Яндекса я решил проверять результаты поиска также и у одного из
конкурентов Яндекса — 🥁 ... Google.

Скрипт дописан, запускаем... И обнаруживаем небольшую проблему: Яндекс начинает
отбраковывать запущенную страницу из безголового Хрома, как попытку зловредного
бота впустую потратить ресурсы Яндекса. Для того, чтобы это обойти, я просто
решил для первого запуска ввести капчу вручную, а дальше мои запросы уже
проходили без проблем.

Поскольку я запускал браузер не в headless-режиме, то попивая кофе я с большим
интересом следил, как результаты все нового и нового поиска отображались у меня
на экране. Иногда от увиденного у меня практически глаза на лоб лезли.
Яндексовая поисковая выдача, переодически, между нечеткими или напрочь
отсутствующими прямыми ответами, выдавала ну просто фантастические цифры и
изображения, в то время как результаты Google в своем большинстве были
достоверными (если считать, что та же самая Wikipedia это достаточно достоверный
источник) и лаконичными. Чтобы не быть голословным, вот сводная таблица с
результатами моих автоматиеских изысканий:

| Страна                | Согласно русской Википедии | Yandex                                   | Google                                   |
| --------------------- | -------------------------- | ---------------------------------------- | ---------------------------------------- |
|                       | 57                         | —<a href="#serp_remark"><sup>*</sup></a> | 57                                       |
| Абхазия               | 58                         | —<a href="#serp_remark"><sup>*</sup></a> | 63                                       |
| Австрия               | 77                         | 100                                      | 77                                       |
| Азад-Кашмир           | 70                         | —<a href="#serp_remark"><sup>*</sup></a> | —<a href="#serp_remark"><sup>*</sup></a> |
| Азербайджан           | 59                         | —<a href="#serp_remark"><sup>*</sup></a> | 59                                       |
| Албания               | 52                         | —<a href="#serp_remark"><sup>*</sup></a> | 52                                       |
| Алжир                 | 75                         | —<a href="#serp_remark"><sup>*</sup></a> | 75                                       |
| Ангола                | 67                         | —<a href="#serp_remark"><sup>*</sup></a> | 67                                       |
| Аргентина             | 62                         | —<a href="#serp_remark"><sup>*</sup></a> | 62                                       |
| Армения               | 67                         | 66                                       | 67                                       |
| Афганистан            | 72                         | 70                                       | 72                                       |
| Бангладеш             | 77                         | —<a href="#serp_remark"><sup>*</sup></a> | 77                                       |
| Белоруссия            | 66                         | —<a href="#serp_remark"><sup>*</sup></a> | 66                                       |
| Бенин                 | 63                         | —<a href="#serp_remark"><sup>*</sup></a> | 63                                       |
| Болгария              | 57                         | 31                                       | 57                                       |
| Боливия               | 57                         | —<a href="#serp_remark"><sup>*</sup></a> | 57                                       |
| Ботсвана              | 58                         | —<a href="#serp_remark"><sup>*</sup></a> | 58                                       |
| Бразилия              | 66                         | —<a href="#serp_remark"><sup>*</sup></a> | 66                                       |
| Буркина-Фасо          | 64                         | —<a href="#serp_remark"><sup>*</sup></a> | 64                                       |
| Бурунди               | 52                         | —<a href="#serp_remark"><sup>*</sup></a> | 52                                       |
| Вануату               | 66                         | —<a href="#serp_remark"><sup>*</sup></a> | 66                                       |
| Венгрия               | 62                         | —<a href="#serp_remark"><sup>*</sup></a> | 62                                       |
| Венесуэла             | 59                         | —<a href="#serp_remark"><sup>*</sup></a> | —<a href="#serp_remark"><sup>*</sup></a> |
| Восточный Тимор       | 66                         | —<a href="#serp_remark"><sup>*</sup></a> | —<a href="#serp_remark"><sup>*</sup></a> |
| Вьетнам               | 66                         | —<a href="#serp_remark"><sup>*</sup></a> | 66                                       |
| Габон                 | 62                         | —<a href="#serp_remark"><sup>*</sup></a> | 62                                       |
| Гаити                 | 52                         | —<a href="#serp_remark"><sup>*</sup></a> | 52                                       |
| Гайана                | 41                         | —<a href="#serp_remark"><sup>*</sup></a> | 41                                       |
| Гамбия                | 56                         | —<a href="#serp_remark"><sup>*</sup></a> | 56                                       |
| Гана                  | 77                         | —<a href="#serp_remark"><sup>*</sup></a> | 77                                       |
| Гватемала             | 65                         | —<a href="#serp_remark"><sup>*</sup></a> | 65                                       |
| Гвинея                | 83                         | —<a href="#serp_remark"><sup>*</sup></a> | 83                                       |
| Гвинея-Бисау          | 48                         | —<a href="#serp_remark"><sup>*</sup></a> | 48                                       |
| Германия              | 65                         | —<a href="#serp_remark"><sup>*</sup></a> | 65                                       |
| Гондурас              | 52                         | —<a href="#serp_remark"><sup>*</sup></a> | 52                                       |
| Греция                | 64                         | —<a href="#serp_remark"><sup>*</sup></a> | 64                                       |
| Грузия                | 69                         | —<a href="#serp_remark"><sup>*</sup></a> | 69                                       |
| Джибути               | 74                         | —<a href="#serp_remark"><sup>*</sup></a> | 73                                       |
| Доминика              | 77                         | —<a href="#serp_remark"><sup>*</sup></a> | 77                                       |
| Доминикана            | 53                         | —<a href="#serp_remark"><sup>*</sup></a> | 53                                       |
| Египет                | 66                         | —<a href="#serp_remark"><sup>*</sup></a> | 66                                       |
| Замбия                | 64                         | —<a href="#serp_remark"><sup>*</sup></a> | 64                                       |
| Зимбабве              | 78                         | —<a href="#serp_remark"><sup>*</sup></a> | 78                                       |
| Израиль               | 81                         | —<a href="#serp_remark"><sup>*</sup></a> | 81                                       |
| Индия                 | 75                         | —<a href="#serp_remark"><sup>*</sup></a> | 75                                       |
| Индонезия             | 59                         | —<a href="#serp_remark"><sup>*</sup></a> | 59                                       |
| Ирак                  | 60                         | —<a href="#serp_remark"><sup>*</sup></a> | 60                                       |
| Иран                  | 72                         | —<a href="#serp_remark"><sup>*</sup></a> | 72                                       |
| Ирландия              | 80                         | —<a href="#serp_remark"><sup>*</sup></a> | 80                                       |
| Исландия              | 52                         | —<a href="#serp_remark"><sup>*</sup></a> | —<a href="#serp_remark"><sup>*</sup></a> |
| Италия                | 79                         | 73                                       | 79                                       |
| Йемен                 | 75                         | —<a href="#serp_remark"><sup>*</sup></a> | —<a href="#serp_remark"><sup>*</sup></a> |
| Кабо-Верде            | 70                         | —<a href="#serp_remark"><sup>*</sup></a> | 70                                       |
| Казахстан             | 68                         | —<a href="#serp_remark"><sup>*</sup></a> | 68                                       |
| Камерун               | 88                         | —<a href="#serp_remark"><sup>*</sup></a> | 88                                       |
| Кения                 | 59                         | —<a href="#serp_remark"><sup>*</sup></a> | 59                                       |
| Кипр                  | 74                         | —<a href="#serp_remark"><sup>*</sup></a> | 74                                       |
| Киргизия              | 52                         | —<a href="#serp_remark"><sup>*</sup></a> | 52                                       |
| Кирибати              | 60                         | —<a href="#serp_remark"><sup>*</sup></a> | 60                                       |
| Колумбия              | 44                         | —<a href="#serp_remark"><sup>*</sup></a> | 44                                       |
| Коморы                | 62                         | —<a href="#serp_remark"><sup>*</sup></a> | 61                                       |
| Конго                 | 57                         | —<a href="#serp_remark"><sup>*</sup></a> | 57                                       |
| Косово                | 39                         | —<a href="#serp_remark"><sup>*</sup></a> | —<a href="#serp_remark"><sup>*</sup></a> |
| Коста-Рика            | 41                         | —<a href="#serp_remark"><sup>*</sup></a> | 41                                       |
| Кот-д’Ивуар           | 79                         | —<a href="#serp_remark"><sup>*</sup></a> | 79                                       |
| Куба                  | 61                         | —<a href="#serp_remark"><sup>*</sup></a> | 61                                       |
| Лаос                  | 75                         | —<a href="#serp_remark"><sup>*</sup></a> | —<a href="#serp_remark"><sup>*</sup></a> |
| Латвия                | 65                         | 99                                       | 65                                       |
| Либерия               | 54                         | —<a href="#serp_remark"><sup>*</sup></a> | 54                                       |
| Ливан                 | 86                         | —<a href="#serp_remark"><sup>*</sup></a> | 86                                       |
| Ливия                 | 61                         | —<a href="#serp_remark"><sup>*</sup></a> | —<a href="#serp_remark"><sup>*</sup></a> |
| Литва                 | 57                         | —<a href="#serp_remark"><sup>*</sup></a> | 57                                       |
| Маврикий              | 62                         | —<a href="#serp_remark"><sup>*</sup></a> | —<a href="#serp_remark"><sup>*</sup></a> |
| Мавритания            | 64                         | —<a href="#serp_remark"><sup>*</sup></a> | 64                                       |
| Мадагаскар            | 46                         | —<a href="#serp_remark"><sup>*</sup></a> | 46                                       |
| Малави                | 66                         | —<a href="#serp_remark"><sup>*</sup></a> | 66                                       |
| Мали                  | 70                         | —<a href="#serp_remark"><sup>*</sup></a> | —<a href="#serp_remark"><sup>*</sup></a> |
| Мальдивы              | 59                         | —<a href="#serp_remark"><sup>*</sup></a> | 59                                       |
| Мальта                | 79                         | —<a href="#serp_remark"><sup>*</sup></a> | 79                                       |
| Маршалловы Острова    | 70                         | —<a href="#serp_remark"><sup>*</sup></a> | 70                                       |
| Мексика               | 67                         | —<a href="#serp_remark"><sup>*</sup></a> | 67                                       |
| Микронезия            | 57                         | —<a href="#serp_remark"><sup>*</sup></a> | —<a href="#serp_remark"><sup>*</sup></a> |
| Мозамбик              | 62                         | —<a href="#serp_remark"><sup>*</sup></a> | 62                                       |
| Молдавия              | 49                         | 44                                       | 49                                       |
| Монголия              | 58                         | —<a href="#serp_remark"><sup>*</sup></a> | 58                                       |
| Мьянма                | 70                         | —<a href="#serp_remark"><sup>*</sup></a> | —<a href="#serp_remark"><sup>*</sup></a> |
| Намибия               | 79                         | —<a href="#serp_remark"><sup>*</sup></a> | 79                                       |
| Науру                 | 52                         | —<a href="#serp_remark"><sup>*</sup></a> | —<a href="#serp_remark"><sup>*</sup></a> |
| Непал                 | 59                         | —<a href="#serp_remark"><sup>*</sup></a> | 59                                       |
| Нигер                 | 61                         | —<a href="#serp_remark"><sup>*</sup></a> | 61                                       |
| Нигерия               | 78                         | —<a href="#serp_remark"><sup>*</sup></a> | 78                                       |
| Никарагуа             | 75                         | —<a href="#serp_remark"><sup>*</sup></a> | 75                                       |
| ОАЭ                   | 72                         | —<a href="#serp_remark"><sup>*</sup></a> | 72                                       |
| Пакистан              | 71                         | —<a href="#serp_remark"><sup>*</sup></a> | 71                                       |
| Палау                 | 52                         | —<a href="#serp_remark"><sup>*</sup></a> | —<a href="#serp_remark"><sup>*</sup></a> |
| Палестина             | 86                         | 77                                       | 85                                       |
| Панама                | 68                         | —<a href="#serp_remark"><sup>*</sup></a> | 68                                       |
| Парагвай              | 49                         | —<a href="#serp_remark"><sup>*</sup></a> | 49                                       |
| Перу                  | 76                         | —<a href="#serp_remark"><sup>*</sup></a> | —<a href="#serp_remark"><sup>*</sup></a> |
| Польша                | 49                         | 47                                       | 49                                       |
| Португалия            | 72                         | 70                                       | 72                                       |
| Россия                | 68                         | 68                                       | 68                                       |
| Руанда                | 63                         | —<a href="#serp_remark"><sup>*</sup></a> | 63                                       |
| Румыния               | 61                         | —<a href="#serp_remark"><sup>*</sup></a> | —<a href="#serp_remark"><sup>*</sup></a> |
| САДР                  | 71                         | —<a href="#serp_remark"><sup>*</sup></a> | —<a href="#serp_remark"><sup>*</sup></a> |
| Сальвадор             | 39                         | —<a href="#serp_remark"><sup>*</sup></a> | 39                                       |
| Сан-Томе и Принсипи   | 79                         | —<a href="#serp_remark"><sup>*</sup></a> | —<a href="#serp_remark"><sup>*</sup></a> |
| Северная Македония    | 58                         | —<a href="#serp_remark"><sup>*</sup></a> | 58                                       |
| Сейшелы               | 60                         | —<a href="#serp_remark"><sup>*</sup></a> | 60                                       |
| Сенегал               | 59                         | —<a href="#serp_remark"><sup>*</sup></a> | 59                                       |
| Сербия                | 51                         | —<a href="#serp_remark"><sup>*</sup></a> | 51                                       |
| Сингапур              | 66                         | 65                                       | 66                                       |
| Сирия                 | 55                         | 54                                       | 55                                       |
| Словакия              | 47                         | —<a href="#serp_remark"><sup>*</sup></a> | 47                                       |
| Словения              | 57                         | —<a href="#serp_remark"><sup>*</sup></a> | 57                                       |
| Сомали                | 59                         | —<a href="#serp_remark"><sup>*</sup></a> | 59                                       |
| Суринам               | 62                         | —<a href="#serp_remark"><sup>*</sup></a> | 62                                       |
| США                   | 78                         | 73                                       | 78                                       |
| Сьерра-Леоне          | 57                         | —<a href="#serp_remark"><sup>*</sup></a> | 57                                       |
| Таджикистан           | 68                         | —<a href="#serp_remark"><sup>*</sup></a> | 68                                       |
| Тайвань               | 64                         | —<a href="#serp_remark"><sup>*</sup></a> | 64                                       |
| Танзания              | 61                         | —<a href="#serp_remark"><sup>*</sup></a> | 61                                       |
| Того                  | 54                         | —<a href="#serp_remark"><sup>*</sup></a> | —<a href="#serp_remark"><sup>*</sup></a> |
| Тринидад и Тобаго     | 62                         | —<a href="#serp_remark"><sup>*</sup></a> | 62                                       |
| ТРСК                  | 60                         | —<a href="#serp_remark"><sup>*</sup></a> | 60                                       |
| Тунис                 | 63                         | —<a href="#serp_remark"><sup>*</sup></a> | 63                                       |
| Туркмения             | 63                         | 62                                       | 63                                       |
| Турция                | 67                         | —<a href="#serp_remark"><sup>*</sup></a> | 67                                       |
| Уганда                | 76                         | —<a href="#serp_remark"><sup>*</sup></a> | 76                                       |
| Узбекистан            | 63                         | —<a href="#serp_remark"><sup>*</sup></a> | 63                                       |
| Украина               | 43                         | —<a href="#serp_remark"><sup>*</sup></a> | 43                                       |
| Уругвай               | 47                         | —<a href="#serp_remark"><sup>*</sup></a> | 47                                       |
| Фиджи                 | 73                         | —<a href="#serp_remark"><sup>*</sup></a> | 73                                       |
| Филиппины             | 76                         | —<a href="#serp_remark"><sup>*</sup></a> | 76                                       |
| Финляндия             | 72                         | 101                                      | 72                                       |
| Франция               | 43                         | —<a href="#serp_remark"><sup>*</sup></a> | 43                                       |
| Хорватия              | 54                         | —<a href="#serp_remark"><sup>*</sup></a> | 54                                       |
| ЦАР                   | 64                         | —<a href="#serp_remark"><sup>*</sup></a> | 64                                       |
| Черногория            | 59                         | —<a href="#serp_remark"><sup>*</sup></a> | 59                                       |
| Чехия                 | 76                         | —<a href="#serp_remark"><sup>*</sup></a> | 76                                       |
| Чили                  | 71                         | —<a href="#serp_remark"><sup>*</sup></a> | 71                                       |
| Шри-Ланка             | 71                         | —<a href="#serp_remark"><sup>*</sup></a> | 71                                       |
| Эквадор               | 65                         | —<a href="#serp_remark"><sup>*</sup></a> | —<a href="#serp_remark"><sup>*</sup></a> |
| Экваториальная Гвинея | 78                         | —<a href="#serp_remark"><sup>*</sup></a> | 78                                       |
| Эритрея               | 75                         | —<a href="#serp_remark"><sup>*</sup></a> | 75                                       |
| Эстония               | 51                         | —<a href="#serp_remark"><sup>*</sup></a> | 51                                       |
| Эфиопия               | 71                         | —<a href="#serp_remark"><sup>*</sup></a> | 71                                       |
| ЮАР                   | 68                         | 27                                       | 68                                       |
| Южная Корея           | 68                         | 35                                       | 68                                       |
| Южная Осетия          | 51                         | —<a href="#serp_remark"><sup>*</sup></a> | 51                                       |
| Южный Судан           | 69                         | —<a href="#serp_remark"><sup>*</sup></a> | 69                                       |

<a id="serp_remark"><sup>*</sup> — <small>Точный результат не был дан, вы можете
обратиться к [скриншотам](https://github.com/underoot/yandex-ages/tree/master/screenshots) за поисковым результатом, или же повторить его сами.</small>

Далее привожу курьезные результаты с моими комментариями:

![](https://raw.githubusercontent.com/underoot/yandex-ages/master/screenshots/%D0%90%D0%B2%D1%81%D1%82%D1%80%D0%B8%D1%8F_google.png)
![](https://raw.githubusercontent.com/underoot/yandex-ages/master/screenshots/%D0%90%D0%B2%D1%81%D1%82%D1%80%D0%B8%D1%8F_yandex.png)
_А президент Австрии знает что отмечает такой знаменательный юбилей?_

![](https://github.com/underoot/yandex-ages/raw/master/screenshots/%D0%91%D0%BE%D0%BB%D0%B3%D0%B0%D1%80%D0%B8%D1%8F_google.png)
![](https://github.com/underoot/yandex-ages/raw/master/screenshots/%D0%91%D0%BE%D0%BB%D0%B3%D0%B0%D1%80%D0%B8%D1%8F_yandex.png)
_Президенту Болгарии скинули 26 лет. Кажется в Яндекс изобрели машину времени
для президентов_

![](https://github.com/underoot/yandex-ages/raw/master/screenshots/%D0%AE%D0%B6%D0%BD%D0%B0%D1%8F%20%D0%9A%D0%BE%D1%80%D0%B5%D1%8F_google.png)
![](https://github.com/underoot/yandex-ages/raw/master/screenshots/%D0%AE%D0%B6%D0%BD%D0%B0%D1%8F%20%D0%9A%D0%BE%D1%80%D0%B5%D1%8F_yandex.png)
_Если Корея, то, по версии Яндекс только одна — там где Ким Чен Ын разумеется._

![](https://github.com/underoot/yandex-ages/raw/master/screenshots/%D0%9B%D0%B0%D1%82%D0%B2%D0%B8%D1%8F_google.png)
![](https://github.com/underoot/yandex-ages/raw/master/screenshots/%D0%9B%D0%B0%D1%82%D0%B2%D0%B8%D1%8F_yandex.png)
_Президент Латвии может считаться долгожителем. Но кто изображен на фотографии?_

![](https://github.com/underoot/yandex-ages/raw/master/screenshots/%D0%9F%D0%B0%D0%BB%D0%B5%D1%81%D1%82%D0%B8%D0%BD%D0%B0_google.png)
![](https://github.com/underoot/yandex-ages/raw/master/screenshots/%D0%9F%D0%B0%D0%BB%D0%B5%D1%81%D1%82%D0%B8%D0%BD%D0%B0_yandex.png)
_Без комментариев_

![](https://github.com/underoot/yandex-ages/raw/master/screenshots/%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F_google.png)
![](https://github.com/underoot/yandex-ages/raw/master/screenshots/%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F_yandex.png)
_Тут, конечно, все в порядке_

![](https://github.com/underoot/yandex-ages/raw/master/screenshots/%D0%A1%D0%A8%D0%90_google.png)
![](https://github.com/underoot/yandex-ages/raw/master/screenshots/%D0%A1%D0%A8%D0%90_yandex.png)
_Но ведь с Капитолием все в порядке, Яндекс_

![](https://github.com/underoot/yandex-ages/raw/master/screenshots/%D0%A4%D0%B8%D0%BD%D0%BB%D1%8F%D0%BD%D0%B4%D0%B8%D1%8F_google.png)
![](https://github.com/underoot/yandex-ages/raw/master/screenshots/%D0%A4%D0%B8%D0%BD%D0%BB%D1%8F%D0%BD%D0%B4%D0%B8%D1%8F_yandex.png)
_Пожалуй, это рекорд..._

Кстати, все скрипты и все скриншоты с данными я положил [к себе на Github](https://github.com/underoot/yandex-ages) —
милости прошу. Спасибо за внимание и до новых встреч!
