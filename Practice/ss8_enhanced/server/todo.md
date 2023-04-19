- [1. Account list](#1-account-list)
- [2. Implementation](#2-implementation)
- [2.1 TechStacks:](#21-techstacks)
- [2.2 Steps](#22-steps)
- [A - UI Template](#a---ui-template)
- [B. Backend](#b-backend)
- [C. Frontend](#c-frontend)
- [D. Enhancements](#d-enhancements)
- [2.3 Issues \& Bugs](#23-issues--bugs)

# 1. Account list

| username  | password  |  role   |
| :-------: | :-------: | :-----: |
|   zoker   | zoker123  |  admin  |
| manager01 | manager01 | manager |
| tester01  | tester01  |  user   |
| tester02  | tester02  |  user   |
| tester03  | tester03  |  user   |


# 2. Implementation

# 2.1 TechStacks:
- Architecture: MVC.
- Redux.
- Axios.

# 2.2 Steps

# A - UI Template

1. [x] Components breakdown.
2. [x] Complete UI template.
3. [x] React Routing.

---

# B. Backend

1. [x] Create Models with mongose.
2. [x] Move existing api call logics to controllers.
3. [x] Student CRUD APIs.

---

# C. Frontend

1. [ ] Connect server to client by applying Redux store.
2. [ ] Homepage list rendering logic.
3.  [ ] Register feature.
4.  [ ] Logout feature.
5.  [ ] Add/edit students from Homepage. Students filter by: class, name.
6.  [ ] Convert to NextJS.

---

# D. Enhancements

1. [ ] Athen: refresh token (store in localStorage).
2.  [ ] How to write unit test. Apply unit testing for further steps.
3.  [ ] Storing refresh token using Redis.
4.  [ ] Authorization: Delete user by admin only. Only manager can edit and add new students. View students is granted for all user levels.
5.  [ ] RegEx and validate function for password schema.
6.  [ ] Promise.all ?

# 2.3 Issues & Bugs

1. [x] Setting default collection in schema to save new model (doc).