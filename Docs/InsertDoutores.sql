USE GestaoHospitalar;
GO

SET NOCOUNT ON; -- Melhora performance evitando mensagens de "1 row affected"

DECLARE @i INT = 1;
DECLARE @TotalRegistros INT = 20000;

-- Variáveis para armazenar dados temporários
DECLARE @Nome NVARCHAR(100);
DECLARE @Sobrenome NVARCHAR(100);
DECLARE @NomeCompleto NVARCHAR(100);
DECLARE @CRM VARCHAR(20);
DECLARE @Estado CHAR(2);
DECLARE @Especialidade NVARCHAR(50);
DECLARE @Email VARCHAR(100);
DECLARE @Telefone VARCHAR(20);
DECLARE @Depto VARCHAR(50);
DECLARE @Status VARCHAR(20);

-- Loop para inserir 5000 registros
WHILE @i <= @TotalRegistros
BEGIN
    -- 1. Gerar Nome Aleatório
    -- Sorteia um primeiro nome
    SELECT @Nome = CHOOSE(ABS(CHECKSUM(NEWID())) % 20 + 1, 
        'João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Fernanda', 'Lucas', 'Juliana', 
        'Marcos', 'Patrícia', 'Rafael', 'Camila', 'Gustavo', 'Bruna', 'Felipe', 
        'Larissa', 'Roberto', 'Sofia', 'Marcelo', 'Amanda');
    
    -- Sorteia um sobrenome
    SELECT @Sobrenome = CHOOSE(ABS(CHECKSUM(NEWID())) % 20 + 1, 
        'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 
        'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 
        'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Vieira', 'Barbosa');
    
    SET @NomeCompleto = @Nome + ' ' + @Sobrenome;

    -- 2. Gerar CRM Único (Usamos o contador @i para garantir unicidade)
    SET @CRM = CAST(@i + 10000 AS VARCHAR(20)); -- Ex: 10001, 10002...

    -- 3. Sortear Estado CRM
    SELECT @Estado = CHOOSE(ABS(CHECKSUM(NEWID())) % 5 + 1, 'SP', 'RJ', 'MG', 'GO', 'RS');

    -- 4. Sortear Especialidade e Departamento
    -- Vamos vincular Depto à Especialidade para fazer sentido
    DECLARE @RandEsp INT = ABS(CHECKSUM(NEWID())) % 10 + 1;
    
    IF @RandEsp = 1 BEGIN SET @Especialidade = 'Cardiologia'; SET @Depto = 'Cardio'; END
    ELSE IF @RandEsp = 2 BEGIN SET @Especialidade = 'Pediatria'; SET @Depto = 'Infantil'; END
    ELSE IF @RandEsp = 3 BEGIN SET @Especialidade = 'Ortopedia'; SET @Depto = 'Trauma'; END
    ELSE IF @RandEsp = 4 BEGIN SET @Especialidade = 'Dermatologia'; SET @Depto = 'Ambulatorio'; END
    ELSE IF @RandEsp = 5 BEGIN SET @Especialidade = 'Neurologia'; SET @Depto = 'Neuro'; END
    ELSE IF @RandEsp = 6 BEGIN SET @Especialidade = 'Ginecologia'; SET @Depto = 'Saude Mulher'; END
    ELSE IF @RandEsp = 7 BEGIN SET @Especialidade = 'Oftalmologia'; SET @Depto = 'Ambulatorio'; END
    ELSE IF @RandEsp = 8 BEGIN SET @Especialidade = 'Psiquiatria'; SET @Depto = 'Saude Mental'; END
    ELSE IF @RandEsp = 9 BEGIN SET @Especialidade = 'Cirurgia Geral'; SET @Depto = 'Cirurgia'; END
    ELSE BEGIN SET @Especialidade = 'Clínica Geral'; SET @Depto = 'Emergencia'; END

    -- 5. Gerar Email Único
    SET @Email = LOWER(@Nome + '.' + @Sobrenome + CAST(@i AS VARCHAR) + '@hospital.com');

    -- 6. Gerar Telefone Aleatório
    SET @Telefone = '(11) 9' + CAST(ABS(CHECKSUM(NEWID())) % 9000 + 1000 AS VARCHAR) + '-' + CAST(ABS(CHECKSUM(NEWID())) % 9000 + 1000 AS VARCHAR);

    -- 7. Sortear Status
    SELECT @Status = CHOOSE(ABS(CHECKSUM(NEWID())) % 3 + 1, 'Disponivel', 'Em Consulta', 'Ausente');

    -- 8. INSERIR NA TABELA
    INSERT INTO [doutores] (
        [Nome], 
        [CRM], 
        [EstadoCRM], 
        [Especialidade], 
        [EmailPrincipal], 
        [EmailSecundario], 
        [Telefone], 
        [Celular], 
        [Endereco], 
        [Bairro], 
        [Cidade], 
        [CEP], 
        [Departamento], 
        [Status], 
        [Situacao]
    )
    VALUES (
        @NomeCompleto,
        @CRM,
        @Estado,
        @Especialidade,
        @Email,
        NULL, -- Email Secundario opcional
        @Telefone,
        @Telefone, -- Repetindo no celular para facilitar
        'Rua Aleatoria, ' + CAST(ABS(CHECKSUM(NEWID())) % 1000 AS VARCHAR),
        'Centro',
        'Goiânia', -- Fixando cidade para exemplo
        '74000000',
        @Depto,
        @Status,
        1 -- Situação Ativo
    );

    SET @i = @i + 1;
END

PRINT 'Sucesso! 20000 Doutores inseridos.';
SET NOCOUNT OFF;
GO