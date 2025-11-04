-- =====================================================
-- 🟦 1. CRIAR PERFIS (amb_profile)
-- =====================================================

INSERT INTO amb_profile (description, created_user)
VALUES 
('Administrador', 1),
('Operador', 1);


-- =====================================================
-- 🟦 2. CRIAR FORMULÁRIO DO MÓDULO USER (amb_form)
-- =====================================================

INSERT INTO amb_form 
(name_table, name_route, menu_name, menu_description, help, created_user)
VALUES 
('user', '/user', 'Usuários', 'Gerenciamento de usuários', 'Tela de gerenciamento de usuários', 1);


-- =====================================================
-- 🟦 3. OBTER IDS CRIADOS EM VARIÁVEIS
-- =====================================================

SET @ADMIN_PROFILE_ID    = (SELECT id FROM amb_profile WHERE description = 'Administrador' LIMIT 1);
SET @OPERATOR_PROFILE_ID = (SELECT id FROM amb_profile WHERE description = 'Operador' LIMIT 1);
SET @USER_FORM_ID        = (SELECT id FROM amb_form    WHERE name_route = '/user' LIMIT 1);


-- =====================================================
-- 🟦 4. CRIAR PERMISSÕES (amb_profile_autoriza)
-- =====================================================

-- 🔹 Administrador: direitos completos CRUD
INSERT INTO amb_profile_autoriza 
(amb_profile_id, amb_form_id, direitos, created_user)
VALUES 
(@ADMIN_PROFILE_ID, @USER_FORM_ID, 'CRUD', 1);

-- 🔹 Operador: somente leitura (R)
INSERT INTO amb_profile_autoriza 
(amb_profile_id, amb_form_id, direitos, created_user)
VALUES 
(@OPERATOR_PROFILE_ID, @USER_FORM_ID, 'R', 1);


-- =====================================================
-- 🟦 5. CRIAR USUÁRIO ADMINISTRADOR PARA TESTE
--     (AJUSTE o nome da tabela se necessário)
-- =====================================================

INSERT INTO user 
(name, email, password, profileId)
VALUES
('Admin Master', 'admin@example.com', '1234', @ADMIN_PROFILE_ID);


-- =====================================================
-- 🟦 6. RESULTADOS FINAIS (CHECK)
-- =====================================================

SELECT 
  'Perfis criados:' AS info,
  COUNT(*) AS total
FROM amb_profile;

SELECT 
  'Formulários criados:' AS info,
  COUNT(*) AS total
FROM amb_form;

SELECT 
  'Autorizações criadas:' AS info,
  COUNT(*) AS total
FROM amb_profile_autoriza;

SELECT 
  'Usuário admin criado:' AS info,
  id, name, email, profileId
FROM user
WHERE email = 'admin@example.com';
