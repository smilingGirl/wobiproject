# wobiproject

This is a project created for my Web Engineering lecture.

The purpose of the tool is to make a writers life easier.
Have you ever struggled creating and planning a world for your creative writing? A complex world with complex characters, lands and cultures is often hard to keep track of. Well struggle no more here comes a simple tool for you.

Available world components (so far):
- World
    - name
    - status (work in progress Y/N)
    - history (backend support only so far)
- Characters
    - first name
    - last name
    - age
    - status (alive/dead)
    - culture (backend support only so far)
    - country (backend support only so far)
- Countries/Lands
    - name
    - system (political)
    - neighbours (backend support only so far)
    - values (backend support only so far)
- Cultures
    - name
    - believes (backend support only so far)
    - holidays (backend support only so far)
    - values (backend support only so far)

API routes for version 1.0.0. : <br />
*** API [GET] /worlds registered <br />
*** API [POST] /worlds registered <br />
*** API [GET] /worlds/:worldID registered <br />
*** API [PUT] /worlds/:worldID registered <br />
*** API [DELETE] /worlds/:worldID registered <br />
*** API [GET] /:world/characters registered <br />
*** API [POST] /:world/characters registered <br />
*** API [PUT] /:world/characters/:characterID registered <br />
*** API [DELETE] /:world/characters/:characterID registered <br />
*** API [GET] /:world/characters/:characterID registered <br />
*** API [GET] /:world/countries registered <br />
*** API [POST] /:world/countries registered <br />
*** API [GET] /:world/countries/:countryID registered <br />
*** API [GET] /:world/cultures registered <br />
*** API [POST] /:world/cultures registered <br />
*** API [GET] /:world/cultures/:cultureID registered <br />

- not included so far: PUT and DELETE support for countries and cultures