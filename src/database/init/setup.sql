CREATE TABLE public.cities (
"id" SERIAL NOT NULL,
"name" character varying NOT NULL,
"description" character varying NULL,
CONSTRAINT "PK_589871db156cc7f92942334ab7e" PRIMARY KEY ("id")
);


CREATE TABLE public.residents (
"id" SERIAL NOT NULL,
"first_name" character varying NOT NULL,
"last_name" character varying NOT NULL,
"city_id" integer NOT NULL,
CONSTRAINT "PK_589871db156cc7f929424ab7e" PRIMARY KEY ("id")
);


ALTER TABLE "residents" ADD CONSTRAINT "FK_45d515503b0253f6443a4a97cf8" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;


CREATE INDEX idx_cities_name_partial ON cities(name) WHERE name IS NOT NULL;
CREATE INDEX idx_residents_city_id_first_name ON residents(city_id, first_name);
