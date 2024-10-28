import xml.etree.ElementTree as ET

class Kml(object):

    def __init__(self):
        self.root = ET.Element('kml', xmlns="http://www.opengis.net/kml/2.2")
        self.doc = ET.SubElement(self.root, 'Document')

    def addPlacemark(self, name, description, longitud, latitud, altitud, altitudeMode):
        pm = ET.SubElement(self.doc, 'Placemark')
        ET.SubElement(pm, 'name').text = '\n' + name + '\n'
        ET.SubElement(pm, 'description').text = '\n' + description + '\n'
        point = ET.SubElement(pm, 'Point')
        ET.SubElement(point, 'coordinates').text = '\n{},{},{}\n'.format(longitud, latitud, altitud)
        ET.SubElement(point, 'altitudeMode').text = '\n' + altitudeMode + '\n'

    def addLineString(self, name, extrude, tesela, coordinateList, altitudeMode, color, width):
        ET.SubElement(self.doc, 'name').text = '\n' + name + '\n'
        pm = ET.SubElement(self.doc, 'Placemark')
        ls = ET.SubElement(pm, 'LineString')
        ET.SubElement(ls, 'extrude').text = '\n' + extrude + '\n'
        ET.SubElement(ls, 'tessellation').text = '\n' + tesela + '\n'
        ET.SubElement(ls, 'coordinates').text = '\n' + coordinateList + '\n'
        ET.SubElement(ls, 'altitudeMode').text = '\n' + altitudeMode + '\n'

        style = ET.SubElement(pm, 'Style')
        line = ET.SubElement(style, 'LineStyle')
        ET.SubElement(line, 'color').text = '\n' + color + '\n'
        ET.SubElement(line, 'width').text = '\n' + width + '\n'

    def write(self, fileNameKML):
        tree = ET.ElementTree(self.root)
        tree.write(fileNameKML, encoding='utf-8', xml_declaration=True)

    def ver(self):
        print("Contenido = ", self.root.tag)

        if self.root.text != None:
            print("Contenido = "    , self.root.text.strip('\n'))
        else:
            print("Contenido = "    , self.root.text)
        
        print("Atributos = "    , self.root.attrib)

        # Recorrido de los elementos del árbol
        for hijo in self.root.findall('.//'): # Expresión XPath
            print("\nElemento = " , hijo.tag)
            if hijo.text != None:
                print("Contenido = ", hijo.text.strip('\n')) #strip() elimina los '\n' del string
            else:
                print("Contenido = ", hijo.text)    
            print("Atributos = ", hijo.attrib)

class XML(object):
    def __init__(self, xml_file):
        # Register the default namespace
        ET.register_namespace('', "http://www.uniovi.es")
        self.tree = ET.parse(xml_file)
        self.root = self.tree.getroot()
        
    def to_kml(self, output_kml_file):
        # Create KML object
        kml = Kml()
        
        # Extract circuit information
        circuit_name = self.root.get('nombre')
        circuit_date = self.root.get('fecha')
        circuit_location = f"{self.root.get('localidad')}, {self.root.get('pais')}"
        
        # Add circuit center point
        coords = self.root.find('{http://www.uniovi.es}coordenadas')
        if coords is not None:
            kml.addPlacemark(
                name=circuit_name,
                description=f"Date: {circuit_date}\nLocation: {circuit_location}",
                longitud=coords.get('longitud'),
                latitud=coords.get('latitud'),
                altitud=coords.get('altitud'),
                altitudeMode="absolute"
            )
        
        # Process track points
        points = []
        i = 0
        for punto in self.root.findall('.//{http://www.uniovi.es}punto'):
            i += 1
            name = format("Punto {}", str(i))
            description = format("Descripcion del punto {}", str(i))
            coords = punto.find('{http://www.uniovi.es}coordenadas')
            if coords is not None:
                points.append(
                    kml.addPlacemark(
                        name=name,
                        description=description,
                        longitud=coords.get('longitud'),
                        latitud=coords.get('latitud'),
                        altitud=coords.get('altitud'),
                        altitudeMode="absolute"
                    )
                )

        # Write KML file
        kml.write(output_kml_file)

def main():
    xml_parser = XML("circuitoEsquema.xml")
    xml_parser.to_kml("circuito.kml")

if __name__ == "__main__":
    main()
