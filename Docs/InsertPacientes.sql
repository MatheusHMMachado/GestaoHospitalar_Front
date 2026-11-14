USE GestaoHospitalar;
GO

SET NOCOUNT ON;

DECLARE @i INT = 1;
DECLARE @TotalRegistros INT = 20000;

-- Variáveis temporárias
DECLARE @Nome NVARCHAR(100);
DECLARE @Sobrenome NVARCHAR(100);
DECLARE @NomeCompleto NVARCHAR(100);
DECLARE @CPF VARCHAR(20);
DECLARE @DataNasc DATE;
DECLARE @Genero VARCHAR(20);
DECLARE @Telefone VARCHAR(20);
DECLARE @Email VARCHAR(100);
DECLARE @TipoSanguineo VARCHAR(3);
DECLARE @Altura INT;
DECLARE @Alergia NVARCHAR(100);
DECLARE @Historico NVARCHAR(200);
DECLARE @ContatoEmergencia NVARCHAR(100);
DECLARE @Parentesco VARCHAR(20);
DECLARE @Seguradora VARCHAR(50);
DECLARE @NumeroApolice VARCHAR(50);

-- Loop
WHILE @i <= @TotalRegistros
BEGIN
    -- 1. Gerar Nome do Paciente
    SELECT @Nome = CHOOSE(ABS(CHECKSUM(NEWID())) % 20 + 1, 
        'Ana', 'Beatriz', 'Carlos', 'Daniel', 'Eduardo', 'Fernanda', 'Gabriel', 'Helena', 
        'Igor', 'Julia', 'Karina', 'Lucas', 'Mariana', 'Nicolas', 'Olivia', 
        'Paulo', 'Quintino', 'Rafael', 'Sara', 'Tatiana');
    
    SELECT @Sobrenome = CHOOSE(ABS(CHECKSUM(NEWID())) % 20 + 1, 
        'Alves', 'Barbosa', 'Costa', 'Dias', 'Esteves', 'Freitas', 'Gomes', 'Henriques', 
        'Inacio', 'Jesus', 'Klein', 'Lopes', 'Mendes', 'Nunes', 'Oliveira', 
        'Pereira', 'Queiroz', 'Rocha', 'Silva', 'Teixeira');
    
    SET @NomeCompleto = @Nome + ' ' + @Sobrenome;

    -- 2. Gerar CPF Único (Simulação de formato XXX.XXX.XXX-XX baseada no contador)
    -- Isso garante que nunca repetirá e passará na constraint UNIQUE
    SET @CPF = FORMAT(@i + 10000000000, '###.###.###-##'); 
    -- Se o FORMAT der erro em versões antigas do SQL, use concatenação simples:
    -- SET @CPF = CAST(@i + 100000000 AS VARCHAR); 

    -- 3. Data de Nascimento (Idade entre 0 e 90 anos atrás)
    SET @DataNasc = DATEADD(DAY, -ABS(CHECKSUM(NEWID())) % 32000, GETDATE());

    -- 4. Genero
    SELECT @Genero = CHOOSE(ABS(CHECKSUM(NEWID())) % 2 + 1, 'Masculino', 'Feminino');

    -- 5. Tipo Sanguíneo
    SELECT @TipoSanguineo = CHOOSE(ABS(CHECKSUM(NEWID())) % 8 + 1, 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');

    -- 6. Altura (entre 150cm e 200cm)
    SET @Altura = 150 + (ABS(CHECKSUM(NEWID())) % 50);

    -- 7. Email Único
    SET @Email = LOWER(@Nome + '.' + @Sobrenome + CAST(@i AS VARCHAR) + '@paciente.com');

    -- 8. Telefone
    SET @Telefone = '(62) 9' + CAST(ABS(CHECKSUM(NEWID())) % 9000 + 1000 AS VARCHAR) + '-' + CAST(ABS(CHECKSUM(NEWID())) % 9000 + 1000 AS VARCHAR);

    -- 9. Dados Médicos Aleatórios
    SELECT @Alergia = CHOOSE(ABS(CHECKSUM(NEWID())) % 5 + 1, 'Nenhuma', 'Penicilina', 'Dipirona', 'Latex', 'Poeira');
    SELECT @Historico = CHOOSE(ABS(CHECKSUM(NEWID())) % 5 + 1, 'Nenhum', 'Hipertensão', 'Diabetes Tipo 2', 'Asma', 'Cirurgia Apendicite');

    -- 10. Contato de Emergência
    SET @ContatoEmergencia = 'Parente de ' + @Nome;
    SELECT @Parentesco = CHOOSE(ABS(CHECKSUM(NEWID())) % 4 + 1, 'Pai', 'Mãe', 'Conjuge', 'Irmão');

    -- 11. Seguradora (Alguns terão NULL para simular particular)
    IF (ABS(CHECKSUM(NEWID())) % 3) = 0 -- 33% de chance de ser NULL
    BEGIN
        SET @Seguradora = NULL;
        SET @NumeroApolice = NULL;
    END
    ELSE
    BEGIN
        SELECT @Seguradora = CHOOSE(ABS(CHECKSUM(NEWID())) % 4 + 1, 'Unimed', 'Bradesco Saude', 'Amil', 'SulAmerica');
        SET @NumeroApolice = CAST(ABS(CHECKSUM(NEWID())) AS VARCHAR);
    END

    -- INSERIR
    INSERT INTO [pacientes] (
        [Nome], [CPF], [DataNascimento], [Genero], 
        [Telefone], [Celular], [EmailPrincipal], [EmailSecundario], 
        [Endereco], [Bairro], [Cidade], [CEP], 
        [TipoSanguineo], [Altura], [Status], 
        [Alergia], [HistoricoMedico], 
        [ContatoEmergencia], [ParentescoContatoEmergencia], [TelefoneEmergencia], 
        [Seguradora], [NumeroApolice], [Sitacao]
    )
    VALUES (
        @NomeCompleto,
        @CPF,
        @DataNasc,
        @Genero,
        @Telefone,
        @Telefone, -- Repetindo no celular
        @Email,
        NULL,
        'Rua dos Pacientes, ' + CAST(@i AS VARCHAR),
        'Setor Bueno',
        'Goiânia',
        '74000000',
        @TipoSanguineo,
        @Altura,
        'Ativo',
        @Alergia,
        @Historico,
        @ContatoEmergencia,
        @Parentesco,
        @Telefone, -- Usando mesmo numero para simplificar
        @Seguradora,
        @NumeroApolice,
        1
    );

    SET @i = @i + 1;
END

PRINT 'Sucesso! 20000 Pacientes inseridos.';
SET NOCOUNT OFF;
GO