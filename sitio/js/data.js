/* Datos de niveles extraídos de los brochures “Matrículas 2025” (Kinder, Primaria, Secundaria).
   Cualquier cambio de contenido se hace aquí. Celdas: número, "-" (no aplica),
   {v, rs} = celda que abarca rs filas, null = celda absorbida por la fila anterior,
   {v, cs:"all"} = celda que abarca todas las columnas de grado. */
(function () {
  var C = {
    red: '#DE0612', green: '#009642', lgreen: '#2ACC6C', blue6: '#0070B7', blue5: '#3696D8',
    purple: '#9654B4', magenta: '#C04FD6', teal: '#14967F', slate: '#30485A', gold: '#F1B300', orange: '#FC7E00', navy: '#00366C'
  };

  window.LC_LEVELS = {
    kinder: {
      name: 'Kinder', grades: ['Kinder I', 'Kinder II', 'Kinder III'], gradeShort: ['K. I', 'K. II', 'K. III'],
      schedule: '8:30 a.m. – 1:00 p.m.', img: 'assets/img/hero-kinder.webp',
      imgAlt: 'Niñas y niños de Kinder con uniforme, sonriendo y con las manos en alto',
      intro: 'Kinder I, II y III. Aprendizaje a través del juego, la exploración y el acompañamiento cercano de docentes y familias.',
      price: 410,
      plan: [
        { area: 'Matemática', color: C.red, rows: [['Habilidades matemáticas', 2, 2, 2], ['Matemática', 4, 4, 4]] },
        { area: 'Comunicación', color: C.blue5, rows: [['Comunicación', 2, 3, 3], ['Habilidad verbal', 2, 1, 1], ['Plan lector', 1, 1, 1], ['Grafomotricidad', 1, 1, 1]] },
        { area: 'Ciencia y tecnología', color: C.green, rows: [['Ciencia y tecnología', 4, 4, 4]] },
        { area: 'Personal social', color: C.lgreen, rows: [['Personal social', 2, 2, 2], ['Desarrollo socioemocional', 1, 1, 1]] },
        { area: 'Psicomotriz', color: C.orange, rows: [['Desarrollo psicomotriz', 2, 2, 2], ['Habilidades deportivas', 1, 1, 1]] },
        { area: 'Inglés', color: C.purple, rows: [['Newcomers', 3, 3, 3]] }
      ],
      totals: [25, 25, 25],
      profile: [
        { t: 'Curioso e inquisitivo', d: 'Interés por descubrir el mundo, formulando preguntas y explorando a través del juego y la observación.', c: C.red, i: 'magnifying-glass' },
        { t: 'Desarrollo de la imaginación y creatividad', d: 'Participación en actividades artísticas y juegos simbólicos que estimulan el pensamiento divergente.', c: C.green, i: 'lightbulb' },
        { t: 'Exposición inicial al inglés', d: 'Introducción lúdica al inglés a través de canciones y juegos, fomentando un oído receptivo.', c: C.lgreen, i: 'globe-hemisphere-west' },
        { t: 'Desarrollo de habilidades artísticas', d: 'Exploración de distintas expresiones artísticas (dibujo, pintura y música) para fomentar la creatividad.', c: C.blue5, i: 'palette' },
        { t: 'Introducción a la actividad física', d: 'Desarrolla habilidades motrices básicas mediante juegos, promoviendo la importancia de la actividad física.', c: C.purple, i: 'person-simple-run' },
        { t: 'Desarrollo de la fe', d: 'Desarrollo de espiritualidad y valores fundamentales, promoviendo el respeto y la gratitud.', c: C.slate, i: 'hands-praying' },
        { t: 'Competencia socioemocional', d: 'Habilidades para reconocer y gestionar emociones, interactuar con otros y comprender normas de convivencia.', c: C.gold, i: 'smiley', dark: true },
        { t: 'Autonomía emergente', d: 'Desarrollo de independencia en actividades cotidianas, fomentando la autorregulación.', c: C.orange, i: 'hand-fist' }
      ]
    },

    primaria: {
      name: 'Primaria', grades: ['1.º', '2.º', '3.º', '4.º', '5.º', '6.º'], gradeShort: ['1.º', '2.º', '3.º', '4.º', '5.º', '6.º'],
      schedule: '8:05 a.m. – 1:45 p.m.', img: 'assets/img/hero-primaria.webp',
      imgAlt: 'Estudiante de primaria y compañero con uniforme, sentados y sonriendo',
      intro: 'De 1.º a 6.º grado. Bases sólidas en matemática, comunicación, ciencias, inglés y tecnología, con formación en fe y valores.',
      price: 450,
      plan: [
        { area: 'Matemática', color: C.red, rows: [['Aritmética', 2, 2, 2, 2, 2, 2], ['Álgebra', 2, 2, 2, 2, 2, 2], ['Geometría', 2, 2, 2, 2, 2, 2], ['Razonamiento matemático', 2, 2, 2, 2, 2, 2]] },
        { area: 'Comunicación', color: C.blue5, rows: [['Lenguaje y gramática', 2, 2, 2, 2, 2, 2], ['Literatura', 2, 2, 2, 2, 2, 2], ['Plan lector', 1, 1, 1, 1, 1, 1], ['Habilidad verbal', 2, 2, 2, 2, 2, 2]] },
        { area: 'Ciencia y tecnología', color: C.green, rows: [['Ciencia y tecnología', 4, 4, 4, '-', '-', '-'], ['Física elemental', '-', '-', '-', 2, 2, 2], ['Química elemental', '-', '-', '-', 2, 2, 2], ['Biología elemental', '-', '-', '-', 2, 2, 2]] },
        { area: 'Personal social', color: C.navy, rows: [['Historia del Perú y universal', 2, 2, 2, 2, 2, 2], ['Geografía', 2, 2, 2, 2, 2, 2]] },
        { area: 'Educación física', color: C.orange, rows: [['Habilidades deportivas', 2, 2, 2, 2, 2, 2]] },
        { area: 'Idioma extranjero', color: C.purple, rows: [['Starters', 4, 4, '-', '-', '-', '-'], ['Little learners', '-', '-', 4, 4, '-', '-'], ['Big thinkers', '-', '-', '-', '-', 4, 4]] },
        { area: 'Arte y cultura', color: C.gold, rows: [['Arte', 2, 2, 2, { v: 1, rs: 2 }, { v: 1, rs: 2 }, { v: 1, rs: 2 }], ['Danzas tradicionales y música', 1, 1, 1, null, null, null]] },
        { area: 'Educación religiosa', color: C.lgreen, rows: [['Religión', 1, 1, 1, 1, 1, 1]] },
        { area: 'Habilidades TIC', color: C.magenta, rows: [['Informática y programación', 2, 2, 2, 1, 1, 1], ['Herramientas de marketing digital', '-', '-', '-', 1, 1, 1]] },
        { area: 'Competencias transversales', color: C.teal, rows: [['Desarrollo de la autonomía', { v: '—', cs: 'all' }], ['Ética y responsabilidad social', { v: '—', cs: 'all' }]] }
      ],
      totals: [35, 35, 35, 35, 35, 35],
      profile: [
        { t: 'Aprendiz autónomo y reflexivo', d: 'Capacidad para planificar y evaluar su propio aprendizaje, desarrollando hábitos de estudio.', c: C.red, i: 'magnifying-glass' },
        { t: 'Responsabilidad global', d: 'Conciencia del rol en la comunidad global y participación en proyectos de bienestar.', c: C.green, i: 'lightbulb' },
        { t: 'Habilidades y dominio básico de inglés', d: 'Comunicación básica en inglés y reconocimiento del idioma como herramienta de acceso a la información.', c: C.lgreen, i: 'globe-hemisphere-west' },
        { t: 'Desarrollo de habilidades artísticas y creativas', d: 'Exploración de formas de arte para expresar creatividad y emociones.', c: C.blue6, i: 'palette' },
        { t: 'Desarrollo de habilidades deportivas', d: 'Desarrolla habilidades motrices básicas mediante juegos, promoviendo la importancia de la actividad física.', c: C.blue5, i: 'person-simple-run' },
        { t: 'Desarrollo de la fe', d: 'Fortalecimiento de la espiritualidad a través de la enseñanza de valores religiosos.', c: C.purple, i: 'hands-praying' },
        { t: 'Conciencia socioemocional y ética', d: 'Desarrollo de empatía, sentido de justicia y respeto hacia los demás.', c: C.magenta, i: 'smiley' },
        { t: 'Pensamiento crítico y resolución de problemas', d: 'Análisis de situaciones, identificación de problemas y propuestas de soluciones creativas.', c: C.teal, i: 'brain' },
        { t: 'Colaborador y comunicador eficaz', d: 'Participación en actividades colaborativas y habilidades de comunicación oral y escrita.', c: C.gold, i: 'hand-fist', dark: true },
        { t: 'Competencias digitales iniciales', d: 'Uso seguro y crítico de herramientas tecnológicas en la búsqueda de información.', c: C.orange, i: 'desktop' }
      ]
    },

    secundaria: {
      name: 'Secundaria', grades: ['1.º', '2.º', '3.º', '4.º', '5.º'], gradeShort: ['1.º', '2.º', '3.º', '4.º', '5.º'],
      schedule: '7:20 a.m. – 1:00 p.m.', img: 'assets/img/hero-secundaria.webp',
      imgAlt: 'Dos estudiantes de secundaria con uniforme levantando el pulgar',
      intro: 'De 1.º a 5.º año. Pensamiento científico, inglés, finanzas personales y tecnología, con formación en fe y servicio.',
      price: 450,
      plan: [
        { area: 'Matemática', color: C.red, rows: [['Aritmética', 2, 2, 2, 2, 2], ['Álgebra', 2, 2, 2, 2, 2], ['Geometría', 2, 2, 2, 2, 2], ['Razonamiento matemático', 2, 2, 2, 2, 2], ['Trigonometría', 2, 2, 2, 2, 2], ['Estadística y probabilidad', '-', '-', '-', 2, 2]] },
        { area: 'Comunicación', color: C.blue5, rows: [['Lengua y gramática', 2, 2, 2, 2, 2], ['Literatura', 1, 1, 1, 1, 1], ['Plan lector', 1, 1, 1, 1, 1], ['Habilidad verbal', 2, 2, 2, 3, 3]] },
        { area: 'Ciencia y tecnología', color: C.green, rows: [['Física I', 2, 2, 2, '-', '-'], ['Física II', '-', '-', '-', 2, 2], ['Química general', 2, 2, 2, '-', '-'], ['Química inorgánica', '-', '-', '-', 2, '-'], ['Química orgánica e inorgánica', '-', '-', '-', '-', 2], ['Biología general', 2, 2, 2, '-', '-'], ['Anatomía', '-', '-', '-', 2, 2]] },
        { area: 'Ciencias sociales', color: C.navy, rows: [['Historia del Perú y universal', 1, 1, 1, 1, 1], ['Geografía', 1, 1, 1, 1, 1], ['Economía, ética y responsabilidad social', '-', '-', '-', 1, 1]] },
        { area: 'Desarrollo personal, ciudadanía y cívica', color: C.blue5, rows: [['Educación cívica', 1, 1, 1, 1, 1]] },
        { area: 'Educación física', color: C.orange, rows: [['Habilidades deportivas', 2, 2, 2, 2, 2]] },
        { area: 'Idioma extranjero', color: C.purple, rows: [['Inglés', 4, 4, 4, 4, 4]] },
        { area: 'Arte y cultura', color: C.gold, rows: [['Arte', { v: 1, rs: 2 }, { v: 1, rs: 2 }, { v: 1, rs: 2 }, { v: 1, rs: 2 }, { v: 1, rs: 2 }], ['Danzas tradicionales', null, null, null, null, null]] },
        { area: 'Educación religiosa', color: C.lgreen, rows: [['Religión', 1, 1, 1, 1, 1]] },
        { area: 'Educación por el trabajo', color: C.magenta, rows: [['Informática y programación', 1, 1, 1, 1, 1], ['Herramientas de marketing digital', 1, 1, 1, 1, 1], ['Finanzas personales', 1, 1, 1, 1, 1]] },
        { area: 'Competencias transversales', color: C.teal, rows: [['Desarrollo de la autonomía', { v: '—', cs: 'all' }], ['Investigación y sustentación de paper', { v: '—', cs: 'all' }]] }
      ],
      totals: [36, 36, 36, 39, 39],
      profile: [
        { t: 'Pensador crítico y analítico', d: 'Capacidad para analizar y evaluar información de manera crítica, aplicando pensamiento científico.', c: C.red, i: 'magnifying-glass' },
        { t: 'Liderazgo y trabajo en equipo', d: 'Habilidades de liderazgo colaborativo, fomentando inclusión y respeto mutuo.', c: C.green, i: 'users-three' },
        { t: 'Cultura de aprendizaje permanente', d: 'Valoración del aprendizaje continuo y adaptación a entornos diversos.', c: C.lgreen, i: 'book-open' },
        { t: 'Dominio intermedio-avanzado del inglés', d: 'Comunicación fluida en inglés, comprendiendo textos académicos y argumentando coherentemente.', c: C.blue6, i: 'globe-hemisphere-west' },
        { t: 'Desarrollo de habilidades artísticas y deportivas', d: 'Uso de las artes como medio de expresión personal y cultural.', c: C.blue5, i: 'person-simple-run' },
        { t: 'Desarrollo de la fe', d: 'Reflexión crítica sobre la fe y participación activa en prácticas religiosas y de servicio.', c: C.purple, i: 'hands-praying' },
        { t: 'Competencias digitales avanzadas', d: 'Uso creativo y ético de herramientas digitales para producción de contenido y análisis de datos.', c: C.magenta, i: 'desktop' },
        { t: 'Autoconocimiento y autogestión', d: 'Enfoque en el bienestar integral, gestionando tiempo y emociones eficazmente.', c: C.teal, i: 'smiley' },
        { t: 'Innovador y emprendedor', d: 'Generación de ideas originales y transformación de estas en proyectos prácticos.', c: C.gold, i: 'lightbulb', dark: true },
        { t: 'Competencias globales y ciudadano responsable', d: 'Comprensión de problemas globales y acción local para soluciones sostenibles.', c: C.orange, i: 'hand-fist' }
      ]
    }
  };

  window.LC_GALLERY = [
    ['assets/img/infra-patio-principal.webp', 'Patio principal'],
    ['assets/img/infra-patio-inicial.webp', 'Patio inicial'],
    ['assets/img/infra-area-recreativa.webp', 'Área recreativa'],
    ['assets/img/infra-aulas.webp', 'Aulas de clase'],
    ['assets/img/infra-lab-ciencias.webp', 'Laboratorio de ciencias'],
    ['assets/img/infra-terraza.webp', 'Terraza'],
    ['assets/img/infra-lab-computo.webp', 'Laboratorio de cómputo'],
    ['assets/img/infra-biblioteca.webp', 'Biblioteca']
  ];
})();
