USE GestaoHospitalar;
GO

SET NOCOUNT ON;

-- 1. PREPARAÇÃO: Criar tabelas temporárias para mapear os IDs REAIS
IF OBJECT_ID('tempdb..#TempPacientes') IS NOT NULL DROP TABLE #TempPacientes;
IF OBJECT_ID('tempdb..#TempDoutores') IS NOT NULL DROP TABLE #TempDoutores;

-- Cria uma lista numerada sequencialmente dos IDs reais
SELECT ROW_NUMBER() OVER (ORDER BY NEWID()) as Indice, ID 
INTO #TempPacientes 
FROM pacientes;

SELECT ROW_NUMBER() OVER (ORDER BY NEWID()) as Indice, ID 
INTO #TempDoutores 
FROM doutores;

-- Variáveis de controle
DECLARE @TotalPacientes INT = (SELECT COUNT(*) FROM #TempPacientes);
DECLARE @TotalDoutores INT = (SELECT COUNT(*) FROM #TempDoutores);
DECLARE @i INT = 1;
DECLARE @TotalRegistros INT = 50000;

-- Variáveis de dados
DECLARE @IdP INT;
DECLARE @IdD INT;
DECLARE @RandP INT;
DECLARE @RandD INT;
DECLARE @Data DATETIME;
DECLARE @Tipo VARCHAR(20);
DECLARE @Duracao INT;
DECLARE @Prioridade VARCHAR(30);
DECLARE @Obs VARCHAR(150);
DECLARE @Prep VARCHAR(150);
DECLARE @Status VARCHAR(20);
DECLARE @Recorrencia VARCHAR(20);
DECLARE @RecorrenciaFinal DATE;

BEGIN TRANSACTION;

WHILE @i <= @TotalRegistros
BEGIN
    -- 2. SORTEIO SEGURO DE IDS
    -- Gera um índice aleatório entre 1 e o Total
    SET @RandP = ABS(CHECKSUM(NEWID())) % @TotalPacientes + 1;
    SET @RandD = ABS(CHECKSUM(NEWID())) % @TotalDoutores + 1;

    -- Busca o ID Real correspondente ao índice sorteado
    SELECT @IdP = ID FROM #TempPacientes WHERE Indice = @RandP;
    SELECT @IdD = ID FROM #TempDoutores WHERE Indice = @RandD;

    -- 3. GERAR DADOS (GARANTINDO NÃO NULOS)
    
    -- Data (Passado e Futuro)
    SET @Data = DATEADD(MINUTE, (ABS(CHECKSUM(NEWID())) % 500000) - 400000, GETDATE());

    -- Status (Baseado na data)
    IF @Data < GETDATE()
        SELECT @Status = CHOOSE(ABS(CHECKSUM(NEWID())) % 3 + 1, 'Concluída', 'Cancelada', 'No-Show');
    ELSE
        SET @Status = 'Agendada';

    -- Tipo (Garantindo valor padrão se der erro)
    SELECT @Tipo = COALESCE(CHOOSE(ABS(CHECKSUM(NEWID())) % 4 + 1, 'Primeira Consulta', 'Retorno', 'Exame', 'Check-up'), 'Retorno');

    -- Duração
    SELECT @Duracao = COALESCE(CHOOSE(ABS(CHECKSUM(NEWID())) % 3 + 1, 30, 45, 60), 30);

    -- Prioridade
    SELECT @Prioridade = COALESCE(CHOOSE(ABS(CHECKSUM(NEWID())) % 3 + 1, 'Baixa', 'Média', 'Alta'), 'Média');

    -- Observações (Pode ser NULL)
    IF (ABS(CHECKSUM(NEWID())) % 2) = 0 
        SET @Obs = 'Observação automática gerada pelo sistema.';
    ELSE 
        SET @Obs = NULL;

    -- Preparações
    IF @Tipo = 'Exame' SET @Prep = 'Jejum necessário'; ELSE SET @Prep = NULL;

    -- Recorrência
    IF (ABS(CHECKSUM(NEWID())) % 20) = 0 
    BEGIN
        SET @Recorrencia = 'Mensal';
        SET @RecorrenciaFinal = DATEADD(MONTH, 3, @Data);
    END
    ELSE
    BEGIN
        SET @Recorrencia = NULL;
        SET @RecorrenciaFinal = NULL;
    END

    -- 4. INSERT
    INSERT INTO [consultas] (
        [IDPaciente], [IDDoutor], [Data], [Tipo], 
        [Duracao], [Prioridade], [Observacoes], [Preparacoes], 
        [Recorrencia], [RecorrenciaFinal], [Status]
    )
    VALUES (
        @IdP, @IdD, @Data, @Tipo, 
        @Duracao, @Prioridade, @Obs, @Prep, 
        @Recorrencia, @RecorrenciaFinal, @Status
    );

    SET @i = @i + 1;
END

COMMIT TRANSACTION;

-- Limpeza
DROP TABLE #TempPacientes;
DROP TABLE #TempDoutores;

PRINT 'Sucesso! 50.000 Consultas geradas com integridade referencial.';
SET NOCOUNT OFF;
GO