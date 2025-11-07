1. Garantir que as permissões estão no banco aqui
Meu Confli aqui
> 1.1 Inserir rota /user na tabela amb_form: e aqui

```sql
  INSERT INTO amb_form 
  (name_table, name_route, menu_name, menu_description)
  VALUES ('user', '/user', 'Usuários', 'Gerenciamento de usuários');
```

Pegue o id gerado (ex.: 1).

> 1.2 Vincular perfil com direitos

Exemplo: o perfil 1 = Administrador terá direitos CRUD.

```sql
  INSERT INTO amb_profile_autoriza 
  (amb_profile_id, amb_form_id, direitos)
  VALUES (1, 1, 'CRUD');
```

Para um perfil limitado:

```sql
  INSERT INTO amb_profile_autoriza 
  (amb_profile_id, amb_form_id, direitos)
  VALUES (2, 1, 'R'); -- só leitura
```

## Agora o sistema sabe que o perfil 1 pode operar /user.

2. O usuário do token precisa ter profileId

Para testar o guard, o req.user precisa ter:

```
{
  "id": 10,
  "email": "admin@example.com",
  "profileId": 1
}
```
3. Gerar um token JWT para teste

A estratégia JWT que você usou exige:

Bearer Token

Assinado com o mesmo segredo da app (JWT_SECRET)

Se você tem apenas o secret, pode gerar assim:

Via site jwt.io (fácil)

Header:

{
  "alg": "HS256",
  "typ": "JWT"
}


Payload:

{
  "sub": 10,
  "email": "admin@example.com",
  "profileId": 1
}


Secret:

changeme


Isso gera um token válido para o seu guard.

4. Testar no Insomnia / Postman
✔ Teste 1 — GET /user (R)
Request
GET http://localhost:3000/user
Authorization: Bearer <TOKEN GERADO>


Se o perfil tiver R → retorna lista de usuários
Se não tiver R → 403 Forbidden

✔ Teste 2 — POST /user (C)
Request
POST http://localhost:3000/user
Authorization: Bearer <TOKEN>
Content-Type: application/json


Body:

{
  "name": "João",
  "email": "joao@example.com",
  "password": "1234",
  "profileId": 2
}


Se tiver C → cria
Se não tiver → 403 Forbidden

✔ Teste 3 — PATCH /user/:id (U)
PATCH http://localhost:3000/user/1
Authorization: Bearer <TOKEN>


Body:

{
  "name": "João Modificado"
}


Se tiver U → atualiza
Sem U → 403 Forbidden

✔ Teste 4 — DELETE /user/:id (D)
DELETE http://localhost:3000/user/1
Authorization: Bearer <TOKEN>


Se tiver D → apaga
Sem D → 403 Forbidden

5. Como saber se o PermissionsGuard foi executado?

O Nest retorna automaticamente:

"Formulário não configurado para esta rota" → rota não cadastrada no amb_form

"Perfil sem direitos configurados" → registro não encontrado em amb_profile_autoriza

"Direito necessário: X" → faltou um direito (C, R, U ou D)

"Usuário sem perfil vinculado" → JWT sem profileId

Isso prova que o guard está funcionando.

6. Debug rápido da rota que o guard lê

Log temporário no guard:

console.log('ROUTE:', req.route.path);


Assim você vê qual rota deve estar no amb_form.name_route.

Quer que eu gere um seed SQL completo para criar:

  * perfis
  * forms
  * autorizações
  * usuário administrador
  * token já pronto para usar