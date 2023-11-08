
create table veiculos_log(
id_chave integer,
valor_antigo decimal(10),
valor_novo decimal(10),
data_alteracao timestamp,
tipo char(1)
);

CREATE OR REPLACE FUNCTION trigger_veiculos()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    insert into veiculos_log (id_chave, valor_antigo, valor_novo, data_alteracao, tipo) values ( old.id_veiculo, old.valor, new.valor, current_date, 'U');
	return new;
  ELSIF TG_OP = 'DELETE' THEN
  	insert into veiculos_log (id_chave, valor_antigo, valor_novo, data_alteracao, tipo) values ( old.id_veiculo, old.valor, null, current_date, 'D');
  ELSIF TG_OP = 'INSERT' THEN
    insert into veiculos_log (id_chave, valor_antigo, valor_novo, data_alteracao, tipo) values (new.id_veiculo,NULL, new.valor, current_date, 'I');
 END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER veiculos_log
AFTER INSERT OR UPDATE OR DELETE ON veiculos
FOR EACH ROW
EXECUTE FUNCTION trigger_veiculos();
