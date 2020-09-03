+++
draft = false
date = 2019-03-30T14:53:31+01:00
title = "Come mi sono costruito un NAS"
slug = ""
tags = []
categories = []
thumbnail = "/img/risparmio.png"
description = ""
+++
<DIV  style="float:left;">![your_img](/img/risparmio.png)</DIV>
Sono sempre alla ricerca della voglia di potermi costruire le cose che mi servono. Ho scoperto da un paio di anno il mondo Raspberry e ho scoperto come con poche cose si possono davvero costruire strumenti molto utili. Avevo poi messo la testa nel mondo di Arduino.. ma non sono stato costante quindi ho abbandonato. Dicevamo del mondo di Raspberry. Ho incrociato per la prima volta il mondo di Raspeberry quando ho visto su youtube una bellissima guida su come costruire una stazione Retrogamer con tutti i giochi da me giocati quando ancora con 200 lire si passava la giornata in sala giochi al mare. E li mi sono messo a studiare e a provare a capire come costruirmela da solo. Da li ho scoperto che bastava una macchinetta da 30 euro potentissima e via.. un po' di ingegno et voilà! DIY (do it yourself ndr). Poi mi sono costruito una piccola stazioncina da mettere dietro la televisione..per evitare di dover attaccare il pc o una chiavetta..mantenuto stesso hardware e quindi spesa 0! Poi ho avuto una necessità.. Comprarmi un NAS. E come non cercare se era disponibile una versione per Raspberry? Eccola! Si chiama **OPENMEDIAVAULT** (https://www.openmediavault.org/), soluzione molto completa con interfaccia italiana. Poi cosa mi è servito.. allora dovevo mettere in sicurezza quasi 1,5TB di foto.. che conservo gelosamente dal 2003. Allora ho comprato 2 dischi da 2TB e li ho uniti facendo un RAID1 (mirror), (comprando una stazioncina per inserire due dischi in contemporanea e collegata al Raspberry via USB) un disco per il backup delle foto, e un disco che avevo da 2 TB per buttare su le cose inutili per liberare spazio. Ci ho messo quasi due giorni per creare il RAID0 dei dischi. 1 giorno per copiare il contenuto del mio disco da 1,5TB, ed ora sono assolutemente soddisfatto della mia scelta. Massima flessibilità.. Mi si è rotto il disco di Backup.. sostituito in 5 minuti con uno nuovo..rilanciato il primo backup..e di nuovo operativo. Se penso di aver speso di più che con una soluzione già pronta.. ? Non di molto.. ma ne ho guadagnato in autostima (me lo sono costruito io) e in flessibilità!

**UPDATE:** ***Ho appena avuto un problemino..il vecchio HardDisk di Backup era alimentato. Quello nuovo non ha alimentazione e il Raspberry non riusciva ad alimentarlo correttamente. Ho sistemato con una ciabattina USB a 10 porte e l'ho alimentata con un alimentato a 5V. Fatto questo e attaccata la ciabattina al Raspberry.. Tutto è tornato a funzionare perfettamente senza nulla spendere e recuperando tutto da casa! :)***

Se volete informazioni.. scrivetemi!

MR
