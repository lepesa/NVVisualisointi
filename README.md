# NVVisualisointi

T‰m‰ on nopea porttaus neuroverkkokoodista Javascriptille. Tarkoituksena on ollut tehd‰ yksinkertainen luokittelija, joka p‰‰ttelee kumpi piste on X- ja Y-koordinaattien ilmoittamassa kohdassa.

![](https://github.com/lepesa/NVVisualisointi/blob/master/neuro.png)


K‰yttˆ:
* Ohjelma on Javascripti‰, joten index.html avaus riitt‰‰
* Alussa tulee valmis pistejoukko
* Jos haluaa piirt‰‰ oman pistejoukon, niin "Clear data" tyhjent‰‰ pisteet. Vasen hiiren nappi tai shift + vasen hiiren nappi piirt‰‰ pisteen haluttuun paikkaan
* Calculate -napista neuroverkko alkaa laskemaan pisteit‰. Laskemista tehd‰‰n kunnes 1000 epochia on t‰ynn‰ tai kokonaisvirhe on alle 1,5%
* Export data tuotaa JSON muotoisen datan pisteist‰, joka voidaan tuoda myˆhemmin ohjelmaan
