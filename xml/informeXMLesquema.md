# Informe de cambios realizados al circuito.xsd

## Cambios de atributos del circuito

Cambian los tipos de los atributos

Generado:
```xml
<xs:attribute name="fecha" type="xs:string" use="required" />
<xs:attribute name="hora" type="xs:NMTOKEN" use="required" />
<xs:attribute name="vueltas" type="xs:NMTOKEN" use="required" />
```

Cambios realizados:
```xml
<xs:attribute name="fecha" type="xs:date" use="required" />
<xs:attribute name="hora" type="xs:time" use="required" />
<xs:attribute name="vueltas" type="xs:integer" use="required" />
```

## Cambios a los elementos longitud y anchura media

Se ha añadido la restricción para ser un decimal positivo

Generado:

```xml
<xs:element name="longitud">
	<xs:complexType>
		<xs:simpleContent>
			<xs:extension base="xs:string">
				<xs:attribute name="medida" type="xs:string" use="required" />
			</xs:extension>
		</xs:simpleContent>
	</xs:complexType>
</xs:element>
<xs:element name="anchuraMedia">
	<xs:complexType>
		<xs:simpleContent>
            <xs:extension base="xs:string">
				<xs:attribute name="medida" type="xs:string" use="required" />
			</xs:extension>
		</xs:simpleContent>
	</xs:complexType>
</xs:element>
```

Cambios realizados:

```xml
    <xs:element name="longitud">
		<xs:complexType>
			<xs:sequence>
				<xs:element name="decimalPositivo">
					<xs:simpleType>
						<xs:restriction base="xs:decimal">
							<xs:minInclusive value="0"/>
						</xs:restriction>
					</xs:simpleType>
				</xs:element>
			</xs:sequence>
			<xs:attribute name="medida" type="xs:string" use="required" />
		</xs:complexType>
	</xs:element>
	<xs:element name="anchuraMedia">
		<xs:complexType>
			<xs:sequence>
				<xs:element name="decimalPositivo">
					<xs:simpleType>
						<xs:restriction base="xs:decimal">
							<xs:minInclusive value="0"/>
						</xs:restriction>
					</xs:simpleType>
				</xs:element>
			</xs:sequence>
			<xs:attribute name="medida" type="xs:string" use="required" />
		</xs:complexType>
	</xs:element>
```

## Cambios de rangos

### Referencias

Generado:

```xml
    <xs:element name="referencias">
		<xs:complexType>
			<xs:sequence minOccurs="1" maxOccurs="unbounded">
				<xs:element ref="referencia" />
			</xs:sequence>
		</xs:complexType>
	</xs:element>
```

Cambios realizados:

```xml
    <xs:element name="referencias">
		<xs:complexType>
			<xs:sequence minOccurs="3" maxOccurs="unbounded">
				<xs:element ref="referencia" />
			</xs:sequence>
		</xs:complexType>
	</xs:element>
```


### Fotos

Generado:

```xml
	<xs:element name="fotos">
		<xs:complexType>
			<xs:sequence minOccurs="1" maxOccurs="unbounded">
				<xs:element ref="foto" />
			</xs:sequence>
		</xs:complexType>
	</xs:element>
```

Cambios realizados:

```xml
	<xs:element name="fotos">
		<xs:complexType>
			<xs:sequence minOccurs="1" maxOccurs="5">
				<xs:element ref="foto" />
			</xs:sequence>
		</xs:complexType>
	</xs:element>
```

### Videos

Generado:

```xml
	<xs:element name="videos">
		<xs:complexType>
			<xs:sequence minOccurs="0" maxOccurs="unbounded">
				<xs:element ref="video" />
			</xs:sequence>
		</xs:complexType>
	</xs:element>
```

Cambios realizados:

```xml
	<xs:element name="videos">
		<xs:complexType>
			<xs:sequence minOccurs="0" maxOccurs="3">
				<xs:element ref="video" />
			</xs:sequence>
		</xs:complexType>
	</xs:element>
```

## Atributos de coordenadas

Generado:

```xml
    <xs:element name="coordenadas">
		<xs:complexType>
			<xs:simpleContent>
				<xs:extension base="xs:string">
					<xs:attribute name="longitud" type="xs:NMTOKEN" use="required" />
					<xs:attribute name="latitud" type="xs:NMTOKEN" use="required" />
					<xs:attribute name="altitud" type="xs:NMTOKEN" use="required" />
				</xs:extension>
			</xs:simpleContent>
		</xs:complexType>
	</xs:element>
```

Cambios realizados:

```xml
    <xs:element name="coordenadas">
		<xs:complexType>
			<xs:simpleContent>
				<xs:extension base="xs:string">
					<xs:attribute name="longitud" type="xs:decimal" use="required" />
					<xs:attribute name="latitud" type="xs:decimal" use="required" />
					<xs:attribute name="altitud" type="xs:decimal" use="required" />
				</xs:extension>
			</xs:simpleContent>
		</xs:complexType>
	</xs:element>
```

## Cambio de tipo del elemento sector

Generado:

```xml
<xs:element name="sector" type="xs:string" />
```

Cambios realizados:

```xml
<xs:element name="sector" type="xs:integer" />
```
