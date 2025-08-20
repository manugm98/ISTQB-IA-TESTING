import React, { useState, useEffect } from 'react';

const questionsData = [
    {
        questionText: '¿Cuál es el propósito principal de un conjunto de datos de prueba en el contexto del aprendizaje automático?',
        answerOptions: [
            { answerText: 'A. Entrenar el modelo de IA.', isCorrect: false, feedback: 'Incorrecto. El propósito principal del conjunto de datos de prueba es evaluar el rendimiento de un modelo de IA ya entrenado. El conjunto de entrenamiento se utiliza para el entrenamiento.' },
            { answerText: 'B. Ajustar los hiperparámetros del modelo.', isCorrect: false, feedback: 'Incorrecto. El conjunto de validación, no el de prueba, se utiliza típicamente para ajustar los hiperparámetros durante el desarrollo del modelo.' },
            { answerText: 'C. Evaluar el rendimiento de un modelo de IA entrenado.', isCorrect: true, feedback: 'Correcto. El conjunto de datos de prueba se utiliza para evaluar el rendimiento general de un modelo de IA en datos no vistos, proporcionando una medida imparcial de la calidad del modelo.' },
            { answerText: 'D. Generar nuevas características para el modelo.', isCorrect: false, feedback: 'Incorrecto. La ingeniería de características se realiza en los datos de entrenamiento y validación antes de que el modelo sea entrenado.' },
        ],
    },
    {
        questionText: '¿Qué es el "sobreajuste" (overfitting) en un modelo de aprendizaje automático?',
        answerOptions: [
            { answerText: 'A. El modelo es demasiado simple y no puede capturar la relación en los datos.', isCorrect: false, feedback: 'Incorrecto. Esto se conoce como "infraajuste" (underfitting).' },
            { answerText: 'B. El modelo funciona bien en los datos de entrenamiento pero mal en datos nuevos.', isCorrect: true, feedback: 'Correcto. El sobreajuste ocurre cuando un modelo memoriza los datos de entrenamiento en lugar de aprender los patrones subyacentes, lo que lleva a un bajo rendimiento en datos nuevos y no vistos.' },
            { answerText: 'C. El modelo se entrena en un conjunto de datos demasiado grande.', isCorrect: false, feedback: 'Incorrecto. El tamaño del conjunto de datos por sí solo no causa sobreajuste, aunque modelos complejos con pocos datos pueden sufrir de este problema.' },
            { answerText: 'D. El modelo no se ha entrenado el tiempo suficiente.', isCorrect: false, feedback: 'Incorrecto. Esto puede causar un infraajuste (underfitting).' },
        ],
    },
    {
        questionText: '¿Cuál es la función principal de la prueba de caja blanca en un sistema de IA?',
        answerOptions: [
            { answerText: 'A. Validar los resultados del modelo sin conocer su estructura interna.', isCorrect: false, feedback: 'Incorrecto. Esto describe la prueba de caja negra.' },
            { answerText: 'B. Probar la estructura interna, la lógica y el código del modelo de IA.', isCorrect: true, feedback: 'Correcto. La prueba de caja blanca se centra en la estructura interna, la lógica y la calidad del código del modelo de IA, como los algoritmos, los hiperparámetros y las dependencias.' },
            { answerText: 'C. Probar las interfaces de usuario del sistema de IA.', isCorrect: false, feedback: 'Incorrecto. La prueba de la interfaz de usuario es una forma de prueba de caja negra.' },
            { answerText: 'D. Evaluar la calidad de los datos de entrada sin considerar el modelo.', isCorrect: false, feedback: 'Incorrecto. La evaluación de los datos es una fase separada, aunque crítica, en el desarrollo de la IA.' },
        ],
    },
    {
        questionText: 'En el contexto de la IA, ¿qué es un sesgo (bias) en el conjunto de datos?',
        answerOptions: [
            { answerText: 'A. Un error en el código del algoritmo de aprendizaje automático.', isCorrect: false, feedback: 'Incorrecto. Un sesgo en los datos es un problema inherente en los datos en sí, no un error de codificación.' },
            { answerText: 'B. Una característica que no es relevante para el problema que se está resolviendo.', isCorrect: false, feedback: 'Incorrecto. Esto es una característica irrelevante, no un sesgo.' },
            { answerText: 'C. Datos que no representan con precisión a la población o el fenómeno que el modelo debe predecir.', isCorrect: true, feedback: 'Correcto. El sesgo en los datos ocurre cuando el conjunto de entrenamiento no es representativo de los datos del mundo real, lo que puede llevar a que el modelo tome decisiones injustas o incorrectas.' },
            { answerText: 'D. Un error de predicción constante en el modelo.', isCorrect: false, feedback: 'Incorrecto. Un error constante puede ser un síntoma de un sesgo, pero el sesgo en sí reside en los datos de entrada.' },
        ],
    },
    {
        questionText: '¿Qué mide la métrica de rendimiento "precisión" (precision) en un modelo de clasificación?',
        answerOptions: [
            { answerText: 'A. La proporción de verdaderos positivos con respecto al total de casos reales positivos.', isCorrect: false, feedback: 'Incorrecto. Esto se conoce como "sensibilidad" o "recall".' },
            { answerText: 'B. La proporción de verdaderos positivos con respecto a todos los casos predichos como positivos.', isCorrect: true, feedback: 'Correcto. La precisión es la capacidad del modelo para identificar solo ejemplos de clases relevantes. Responde a la pregunta: "De todas las instancias que el modelo predijo como positivas, ¿cuántas son realmente positivas?".' },
            { answerText: 'C. La proporción de verdaderos negativos con respecto al total de casos reales negativos.', isCorrect: false, feedback: 'Incorrecto. Esto se conoce como "especificidad".' },
            { answerText: 'D. La proporción de predicciones correctas sobre el total de predicciones.', isCorrect: false, feedback: 'Incorrecto. Esto se conoce como "exactitud" (accuracy).' },
        ],
    },
    {
        questionText: '¿Qué es un "fallo adverso" (adverse event) en el contexto de la prueba de IA?',
        answerOptions: [
            { answerText: 'A. Un error de código en el modelo de IA.', isCorrect: false, feedback: 'Incorrecto. Un fallo adverso es una consecuencia del comportamiento del modelo en el mundo real, no un error de codificación.' },
            { answerText: 'B. Un resultado inesperado o dañino de una decisión de un sistema de IA.', isCorrect: true, feedback: 'Correcto. Un fallo adverso es cualquier resultado inesperado, indeseado o perjudicial que ocurre debido a las acciones o decisiones de un sistema de IA.' },
            { answerText: 'C. Un error de predicción que no es crítico.', isCorrect: false, feedback: 'Incorrecto. Un fallo adverso implica un resultado perjudicial, no simplemente un error menor.' },
            { answerText: 'D. Cuando el modelo de IA no puede procesar los datos de entrada.', isCorrect: false, feedback: 'Incorrecto. Esto es un error de procesamiento, no necesariamente un fallo adverso.' },
        ],
    },
    {
        questionText: '¿Cuál es el rol de un "test oracle" en la prueba de sistemas de IA?',
        answerOptions: [
            { answerText: 'A. Generar automáticamente los datos de prueba.', isCorrect: false, feedback: 'Incorrecto. Un test oracle se utiliza para evaluar la corrección de una salida de prueba, no para generar los datos de entrada.' },
            { answerText: 'B. Determinar si los resultados de un modelo de IA son correctos o incorrectos.', isCorrect: true, feedback: 'Correcto. Un test oracle es un mecanismo o fuente que determina si el comportamiento o los resultados de un sistema bajo prueba son correctos, especialmente en situaciones donde no hay una respuesta predefinida.' },
            { answerText: 'C. Entrenar el modelo con datos de alta calidad.', isCorrect: false, feedback: 'Incorrecto. El test oracle no se utiliza para el entrenamiento, sino para la evaluación.' },
            { answerText: 'D. Recopilar y limpiar los datos de entrenamiento.', isCorrect: false, feedback: 'Incorrecto. La recopilación y limpieza de datos es parte de la fase de preparación de datos.' },
        ],
    },
    {
        questionText: '¿Qué es una prueba de "adversarial" en el contexto de la prueba de IA?',
        answerOptions: [
            { answerText: 'A. Una prueba para verificar si el modelo puede detectar intrusiones en la red.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de seguridad general, no específica de la prueba adversarial.' },
            { answerText: 'B. Una técnica de prueba donde los datos de entrada se manipulan para engañar al modelo.', isCorrect: true, feedback: 'Correcto. La prueba adversarial implica crear entradas específicamente diseñadas para confundir o engañar a un modelo de IA, exponiendo sus debilidades y vulnerabilidades.' },
            { answerText: 'C. Un tipo de prueba de estrés para verificar la carga de trabajo del modelo.', isCorrect: false, feedback: 'Incorrecto. La prueba de estrés evalúa el rendimiento bajo alta carga.' },
            { answerText: 'D. Un método para probar si el modelo puede resolver problemas complejos.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de funcionalidad, no una prueba adversarial.' },
        ],
    },
    {
        questionText: '¿Qué es un "falso positivo" en un modelo de clasificación?',
        answerOptions: [
            { answerText: 'A. El modelo predijo incorrectamente una clase negativa como positiva.', isCorrect: true, feedback: 'Correcto. Un falso positivo ocurre cuando el modelo predice erróneamente una instancia como positiva cuando en realidad es negativa.' },
            { answerText: 'B. El modelo predijo correctamente una clase positiva como positiva.', isCorrect: false, feedback: 'Incorrecto. Esto es un verdadero positivo.' },
            { answerText: 'C. El modelo predijo correctamente una clase negativa como negativa.', isCorrect: false, feedback: 'Incorrecto. Esto es un verdadero negativo.' },
            { answerText: 'D. El modelo predijo incorrectamente una clase positiva como negativa.', isCorrect: false, feedback: 'Incorrecto. Esto es un falso negativo.' },
        ],
    },
    {
        questionText: '¿Por qué la repetibilidad y la reproducibilidad son desafíos importantes en la prueba de IA?',
        answerOptions: [
            { answerText: 'A. Debido al alto costo de la computación.', isCorrect: false, feedback: 'Incorrecto. Aunque el costo es un factor, no es la razón principal de los desafíos de repetibilidad.' },
            { answerText: 'B. Porque los modelos de IA son a menudo deterministas.', isCorrect: false, feedback: 'Incorrecto. Los modelos de IA no siempre son deterministas y pueden producir resultados diferentes en cada ejecución.' },
            { answerText: 'C. Debido a la naturaleza estocástica de los algoritmos de entrenamiento y la variabilidad en los datos.', isCorrect: true, feedback: 'Correcto. La repetibilidad y la reproducibilidad son difíciles porque los algoritmos de entrenamiento de IA pueden tener un componente aleatorio (estocástico) y los datos de entrada pueden cambiar, lo que lleva a diferentes resultados con cada ejecución.' },
            { answerText: 'D. Porque los modelos de IA son demasiado rápidos para ser probados.', isCorrect: false, feedback: 'Incorrecto. La velocidad no impide la prueba, aunque puede plantear desafíos de rendimiento.' },
        ],
    },
    {
        questionText: '¿Cuál es un enfoque de "caja negra" para probar un sistema de IA?',
        answerOptions: [
            { answerText: 'A. Probar el código fuente del modelo.', isCorrect: false, feedback: 'Incorrecto. Esto es un enfoque de caja blanca.' },
            { answerText: 'B. Evaluar el comportamiento del sistema de IA basándose únicamente en sus entradas y salidas.', isCorrect: true, feedback: 'Correcto. La prueba de caja negra se enfoca en la funcionalidad del sistema sin conocimiento de su estructura interna. En IA, esto significa probar las entradas y salidas del modelo.' },
            { answerText: 'C. Probar los componentes individuales del modelo.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de unidad, que es parte de la prueba de caja blanca.' },
            { answerText: 'D. Probar el rendimiento del hardware del servidor.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de rendimiento del sistema de hardware, no del modelo de IA.' },
        ],
    },
    {
        questionText: '¿Qué significa la "explicabilidad" (explainability) en la prueba de IA?',
        answerOptions: [
            { answerText: 'A. La capacidad del modelo de IA para procesar grandes volúmenes de datos.', isCorrect: false, feedback: 'Incorrecto. Esto se relaciona con la escalabilidad.' },
            { answerText: 'B. La capacidad de entender por qué un modelo de IA llegó a una decisión o predicción particular.', isCorrect: true, feedback: 'Correcto. La explicabilidad es crucial para la confianza y la depuración. Permite a los probadores y usuarios comprender el razonamiento detrás de las predicciones del modelo.' },
            { answerText: 'C. La capacidad del modelo para ser integrado en un sistema más grande.', isCorrect: false, feedback: 'Incorrecto. Esto se relaciona con la integración.' },
            { answerText: 'D. La capacidad de un modelo de IA para ser ajustado fácilmente.', isCorrect: false, feedback: 'Incorrecto. Esto se relaciona con la facilidad de mantenimiento.' },
        ],
    },
    {
        questionText: '¿Cuál es una métrica clave para evaluar un modelo de clasificación binaria?',
        answerOptions: [
            { answerText: 'A. R-cuadrado (R-squared).', isCorrect: false, feedback: 'Incorrecto. R-cuadrado se usa para modelos de regresión.' },
            { answerText: 'B. Error cuadrático medio (MSE).', isCorrect: false, feedback: 'Incorrecto. MSE se usa para modelos de regresión.' },
            { answerText: 'C. Matriz de confusión.', isCorrect: true, feedback: 'Correcto. Una matriz de confusión es una tabla que se utiliza para describir el rendimiento de un modelo de clasificación, mostrando los verdaderos positivos, verdaderos negativos, falsos positivos y falsos negativos.' },
            { answerText: 'D. Desviación estándar.', isCorrect: false, feedback: 'Incorrecto. La desviación estándar se usa para medir la dispersión de datos.' },
        ],
    },
    {
        questionText: '¿Qué tipo de prueba de sesgo podría identificar si un modelo de IA es injusto con un grupo demográfico específico?',
        answerOptions: [
            { answerText: 'A. Prueba de rendimiento.', isCorrect: false, feedback: 'Incorrecto. La prueba de rendimiento se centra en la velocidad y la eficiencia, no en la equidad.' },
            { answerText: 'B. Prueba de estabilidad.', isCorrect: false, feedback: 'Incorrecto. La prueba de estabilidad evalúa el comportamiento del modelo bajo condiciones extremas.' },
            { answerText: 'C. Prueba de equidad (fairness).', isCorrect: true, feedback: 'Correcto. Las pruebas de equidad son cruciales para identificar si un modelo de IA exhibe sesgos o un trato injusto hacia ciertos grupos de personas, como los definidos por raza, género o edad.' },
            { answerText: 'D. Prueba de carga.', isCorrect: false, feedback: 'Incorrecto. La prueba de carga se centra en el rendimiento del sistema bajo condiciones de alta carga.' },
        ],
    },
    {
        questionText: '¿Cuál es un riesgo potencial de usar datos de entrenamiento de baja calidad?',
        answerOptions: [
            { answerText: 'A. El modelo será más eficiente.', isCorrect: false, feedback: 'Incorrecto. La baja calidad de los datos no mejora la eficiencia.' },
            { answerText: 'B. El modelo no podrá procesar los datos de entrada.', isCorrect: false, feedback: 'Incorrecto. El modelo puede procesar los datos de baja calidad, pero los resultados serán deficientes.' },
            { answerText: 'C. El modelo puede aprender patrones incorrectos y producir resultados sesgados o inexactos.', isCorrect: true, feedback: 'Correcto. Los modelos de IA son tan buenos como los datos con los que se entrenan. Los datos de baja calidad (con errores, ruido o sesgo) pueden llevar a un modelo defectuoso y poco confiable.' },
            { answerText: 'D. El entrenamiento del modelo será mucho más rápido.', isCorrect: false, feedback: 'Incorrecto. La velocidad de entrenamiento no está directamente relacionada con la calidad de los datos.' },
        ],
    },
    {
        questionText: '¿Cuál es el objetivo principal de la prueba de "robustez" (robustness) en un sistema de IA?',
        answerOptions: [
            { answerText: 'A. Probar la velocidad de predicción del modelo.', isCorrect: false, feedback: 'Incorrecto. Eso es parte de la prueba de rendimiento.' },
            { answerText: 'B. Evaluar cómo se desempeña el modelo con datos de entrada ruidosos o anómalos.', isCorrect: true, feedback: 'Correcto. La prueba de robustez verifica la capacidad del modelo para manejar entradas que difieren de los datos de entrenamiento sin fallar o dar predicciones incorrectas.' },
            { answerText: 'C. Probar el tamaño del modelo de IA.', isCorrect: false, feedback: 'Incorrecto. Esto no es parte de la prueba de robustez.' },
            { answerText: 'D. Probar la facilidad de uso de la interfaz de usuario.', isCorrect: false, feedback: 'Incorrecto. Esto es parte de las pruebas de usabilidad.' },
        ],
    },
    {
        questionText: '¿Qué es una prueba de "regresión" en la prueba de IA?',
        answerOptions: [
            { answerText: 'A. Probar si el modelo de IA puede manejar una gran cantidad de datos.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de carga.' },
            { answerText: 'B. Probar si los cambios en el modelo o en los datos han introducido nuevos defectos o han roto la funcionalidad existente.', isCorrect: true, feedback: 'Correcto. La prueba de regresión se realiza después de un cambio para garantizar que el modelo aún funciona como se espera y no ha "regresado" a un estado de error.' },
            { answerText: 'C. Probar si el modelo puede realizar tareas más complejas con el tiempo.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de progresión.' },
            { answerText: 'D. Probar la capacidad del modelo de retroceder a una versión anterior.', isCorrect: false, feedback: 'Incorrecto. Aunque la regresión se relaciona con volver, en la prueba de software y IA se refiere a la introducción de nuevos errores.' },
        ],
    },
    {
        questionText: '¿Qué métrica se utiliza para evaluar un modelo de regresión?',
        answerOptions: [
            { answerText: 'A. Exactitud (Accuracy).', isCorrect: false, feedback: 'Incorrecto. La exactitud se utiliza para modelos de clasificación.' },
            { answerText: 'B. Precisión (Precision).', isCorrect: false, feedback: 'Incorrecto. La precisión se utiliza para modelos de clasificación.' },
            { answerText: 'C. Error Cuadrático Medio (MSE).', isCorrect: true, feedback: 'Correcto. El Error Cuadrático Medio es una métrica comúnmente utilizada para modelos de regresión, midiendo el promedio de los errores al cuadrado.' },
            { answerText: 'D. Matriz de Confusión.', isCorrect: false, feedback: 'Incorrecto. La matriz de confusión se utiliza para modelos de clasificación.' },
        ],
    },
    {
        questionText: '¿Qué es un "test de invariancia" en la prueba de IA?',
        answerOptions: [
            { answerText: 'A. Probar si el modelo da la misma predicción después de una transformación irrelevante de los datos de entrada.', isCorrect: true, feedback: 'Correcto. Un test de invariancia verifica que una transformación irrelevante para el significado de la entrada (como rotar una imagen de un objeto) no cambie la predicción del modelo.' },
            { answerText: 'B. Probar si el modelo es insensible a los datos de entrenamiento.', isCorrect: false, feedback: 'Incorrecto. El modelo debe ser sensible a los datos de entrenamiento para aprender.' },
            { answerText: 'C. Probar la estabilidad del modelo a lo largo del tiempo.', isCorrect: false, feedback: 'Incorrecto. Esto es parte de la prueba de estabilidad o de regresión.' },
            { answerText: 'D. Probar si el modelo puede detectar patrones que no cambian en los datos.', isCorrect: false, feedback: 'Incorrecto. Esto es un tipo de funcionalidad, no un test de invariancia.' },
        ],
    },
    {
        questionText: '¿Qué es un "conjunto de validación" (validation set)?',
        answerOptions: [
            { answerText: 'A. Un conjunto de datos utilizado para la prueba final del modelo.', isCorrect: false, feedback: 'Incorrecto. Eso es el conjunto de prueba.' },
            { answerText: 'B. Un conjunto de datos utilizado para la prueba inicial del modelo.', isCorrect: false, feedback: 'Incorrecto. Eso es el conjunto de prueba.' },
            { answerText: 'C. Un conjunto de datos utilizado para ajustar los hiperparámetros y evaluar el modelo durante el entrenamiento.', isCorrect: true, feedback: 'Correcto. El conjunto de validación se utiliza para afinar el modelo durante la fase de entrenamiento, permitiendo al desarrollador ajustar los hiperparámetros sin tocar el conjunto de prueba final.' },
            { answerText: 'D. Un conjunto de datos utilizado para el entrenamiento inicial del modelo.', isCorrect: false, feedback: 'Incorrecto. Eso es el conjunto de entrenamiento.' },
        ],
    },
    {
        questionText: '¿Qué es la "trazabilidad" (traceability) en la prueba de IA?',
        answerOptions: [
            { answerText: 'A. La capacidad de rastrear los errores del software.', isCorrect: false, feedback: 'Incorrecto. La trazabilidad en IA es más amplia que solo el rastreo de errores.' },
            { answerText: 'B. La capacidad de rastrear las decisiones y predicciones del modelo hasta los datos y el código que lo generaron.', isCorrect: true, feedback: 'Correcto. La trazabilidad es la capacidad de seguir el rastro de la información desde el origen hasta el resultado. En IA, esto implica vincular las predicciones del modelo con los datos de entrada, el código, el modelo y los requisitos.' },
            { answerText: 'C. La capacidad de rastrear el uso del modelo de IA por parte de los usuarios.', isCorrect: false, feedback: 'Incorrecto. Esto es un aspecto de la prueba de usabilidad o de auditoría, no la trazabilidad en sí misma.' },
            { answerText: 'D. La capacidad de un modelo de IA para generar un informe de auditoría.', isCorrect: false, feedback: 'Incorrecto. Un informe de auditoría es un resultado de la trazabilidad, no la trazabilidad en sí misma.' },
        ],
    },
    {
        questionText: '¿Cuál es una técnica de "reducción de dimensionalidad" (dimensionality reduction)?',
        answerOptions: [
            { answerText: 'A. Aumentar el número de características en un conjunto de datos.', isCorrect: false, feedback: 'Incorrecto. Esto es lo opuesto a la reducción de dimensionalidad.' },
            { answerText: 'B. Convertir datos de texto en datos numéricos.', isCorrect: false, feedback: 'Incorrecto. Esto es una parte de la preparación de datos.' },
            { answerText: 'C. Disminuir el número de características o variables en un conjunto de datos para simplificar el modelo.', isCorrect: true, feedback: 'Correcto. La reducción de dimensionalidad simplifica un modelo al reducir el número de variables de entrada, lo que puede ayudar a evitar el sobreajuste y mejorar el rendimiento.' },
            { answerText: 'D. Aumentar el número de ejemplos en un conjunto de datos.', isCorrect: false, feedback: 'Incorrecto. Esto es aumento de datos, no reducción de dimensionalidad.' },
        ],
    },
    {
        questionText: '¿Qué es una prueba de "estrés" para un sistema de IA?',
        answerOptions: [
            { answerText: 'A. Probar la capacidad del modelo para aprender de los errores.', isCorrect: false, feedback: 'Incorrecto. Esto se relaciona con el aprendizaje por refuerzo, no con la prueba de estrés.' },
            { answerText: 'B. Probar la capacidad del sistema de IA para manejar una carga de trabajo extrema y condiciones de fallo.', isCorrect: true, feedback: 'Correcto. La prueba de estrés evalúa el rendimiento y la estabilidad del sistema bajo una carga de trabajo que excede la carga de trabajo prevista, buscando puntos de fallo.' },
            { answerText: 'C. Probar si el modelo puede funcionar en un entorno de red lento.', isCorrect: false, feedback: 'Incorrecto. Eso es una prueba de rendimiento bajo condiciones de red específicas.' },
            { answerText: 'D. Probar las interfaces de usuario del sistema de IA.', isCorrect: false, feedback: 'Incorrecto. La prueba de la interfaz de usuario es una forma de prueba de caja negra.' },
        ],
    },
    {
        questionText: '¿Cuál de los siguientes es un ejemplo de "prueba de regresión" en IA?',
        answerOptions: [
            { answerText: 'A. Aumentar la cantidad de datos de prueba para mejorar la cobertura.', isCorrect: false, feedback: 'Incorrecto. Esto se relaciona con la cobertura de datos.' },
            { answerText: 'B. Ejecutar un conjunto de pruebas existentes después de actualizar un algoritmo para asegurar que las funcionalidades previamente correctas no se hayan roto.', isCorrect: true, feedback: 'Correcto. La prueba de regresión se realiza para confirmar que los cambios en el modelo o en el software no han introducido nuevos defectos.' },
            { answerText: 'C. Probar si el modelo funciona con nuevos tipos de datos.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de aceptación o de nueva funcionalidad.' },
            { answerText: 'D. Probar si el modelo puede aprender de un conjunto de datos más grande.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de escalabilidad.' },
        ],
    },
    {
        questionText: '¿Qué se evalúa en la "prueba de equidad" (fairness testing) de un sistema de IA?',
        answerOptions: [
            { answerText: 'A. Que el modelo sea justo con todos los grupos de usuarios, sin sesgos.', isCorrect: true, feedback: 'Correcto. La prueba de equidad se asegura de que el modelo no sea sesgado o discriminatorio hacia ciertos grupos demográficos. Evalúa la justicia y la imparcialidad de las predicciones del modelo.' },
            { answerText: 'B. Que el modelo sea preciso en todas las predicciones.', isCorrect: false, feedback: 'Incorrecto. La exactitud se mide con métricas como la exactitud (accuracy) o la precisión (precision), no la equidad.' },
            { answerText: 'C. Que el modelo sea seguro contra ataques adversarios.', isCorrect: false, feedback: 'Incorrecto. La prueba de seguridad se encarga de esto.' },
            { answerText: 'D. Que el modelo sea rápido y eficiente.', isCorrect: false, feedback: 'Incorrecto. La velocidad y la eficiencia se evalúan en las pruebas de rendimiento.' },
        ],
    },
    {
        questionText: '¿Cuál es el propósito de un "test de seguridad" en un sistema de IA?',
        answerOptions: [
            { answerText: 'A. Probar si el modelo de IA está protegido contra ataques maliciosos.', isCorrect: true, feedback: 'Correcto. Los test de seguridad buscan vulnerabilidades en los sistemas de IA, como la manipulación de datos o el acceso no autorizado, para proteger el modelo de ataques maliciosos.' },
            { answerText: 'B. Asegurar que los datos de entrada sean seguros para el modelo.', isCorrect: false, feedback: 'Incorrecto. Esto es parte de la validación de los datos, pero no el objetivo principal de la prueba de seguridad del modelo.' },
            { answerText: 'C. Probar que el modelo puede trabajar en un entorno seguro.', isCorrect: false, feedback: 'Incorrecto. Esto se relaciona con el entorno operativo, no con la seguridad del modelo en sí.' },
            { answerText: 'D. Probar si el modelo puede generar predicciones seguras.', isCorrect: false, feedback: 'Incorrecto. La seguridad no se refiere a la naturaleza de las predicciones, sino a la protección del sistema.' },
        ],
    },
    {
        questionText: '¿Qué significa la "inferencia" en el contexto de la IA?',
        answerOptions: [
            { answerText: 'A. El proceso de usar un modelo de IA entrenado para hacer predicciones.', isCorrect: true, feedback: 'Correcto. La inferencia es el proceso de tomar una nueva entrada de datos y usar un modelo de IA ya entrenado para generar una predicción o conclusión.' },
            { answerText: 'B. El proceso de entrenar un modelo de IA.', isCorrect: false, feedback: 'Incorrecto. Eso es el entrenamiento del modelo.' },
            { answerText: 'C. El proceso de recopilar datos de entrada.', isCorrect: false, feedback: 'Incorrecto. Eso es la preparación de datos.' },
            { answerText: 'D. El proceso de ajustar los hiperparámetros del modelo.', isCorrect: false, feedback: 'Incorrecto. Eso es la validación o el ajuste del modelo.' },
        ],
    },
    {
        questionText: '¿Qué es una prueba de "usabilidad" en un sistema de IA?',
        answerOptions: [
            { answerText: 'A. Probar la facilidad con la que los usuarios pueden interactuar con el sistema de IA.', isCorrect: true, feedback: 'Correcto. La prueba de usabilidad se centra en qué tan intuitivo y fácil de usar es el sistema de IA, incluyendo su interfaz y la forma en que presenta la información a los usuarios.' },
            { answerText: 'B. Probar la seguridad del sistema.', isCorrect: false, feedback: 'Incorrecto. Esto se relaciona con la prueba de seguridad.' },
            { answerText: 'C. Probar la velocidad de predicción del modelo.', isCorrect: false, feedback: 'Incorrecto. Esto se relaciona con la prueba de rendimiento.' },
            { answerText: 'D. Probar la capacidad del modelo para aprender de los datos.', isCorrect: false, feedback: 'Incorrecto. Esto se relaciona con el entrenamiento y la validación.' },
        ],
    },
    {
        questionText: '¿Cuál es un enfoque común para probar la "trazabilidad" de un modelo de IA?',
        answerOptions: [
            { answerText: 'A. Revisar el código fuente del modelo.', isCorrect: false, feedback: 'Incorrecto. Esto se relaciona con la prueba de caja blanca.' },
            { answerText: 'B. Mapear las predicciones del modelo a los datos y decisiones de diseño originales.', isCorrect: true, feedback: 'Correcto. Mapear las predicciones a los datos, los requisitos y el código de desarrollo es el proceso clave para asegurar la trazabilidad y la auditabilidad del modelo.' },
            { answerText: 'C. Realizar pruebas de carga y estrés.', isCorrect: false, feedback: 'Incorrecto. Esto es para la prueba de rendimiento.' },
            { answerText: 'D. Generar un informe de rendimiento del modelo.', isCorrect: false, feedback: 'Incorrecto. Un informe de rendimiento es un resultado de la prueba, pero no un enfoque para probar la trazabilidad.' },
        ],
    },
    {
        questionText: '¿Qué se busca en una prueba de "monitoreo del modelo" (model monitoring)?',
        answerOptions: [
            { answerText: 'A. Evaluar el rendimiento del modelo en producción y detectar el "desplazamiento del modelo" (model drift).', isCorrect: true, feedback: 'Correcto. El monitoreo del modelo en producción es esencial para asegurar que su rendimiento no se degrade con el tiempo, un fenómeno conocido como "model drift" causado por cambios en los datos del mundo real.' },
            { answerText: 'B. Probar el modelo antes de que se despliegue en producción.', isCorrect: false, feedback: 'Incorrecto. Esto es parte de las pruebas pre-despliegue, no del monitoreo continuo.' },
            { answerText: 'C. Probar la eficiencia de los algoritmos de entrenamiento.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de eficiencia del algoritmo.' },
            { answerText: 'D. Probar la seguridad de los datos de entrada.', isCorrect: false, feedback: 'Incorrecto. Esto es parte de las pruebas de seguridad y validación de datos.' },
        ],
    },
    {
        questionText: '¿Qué es un "test de sensibilidad" en la prueba de IA?',
        answerOptions: [
            { answerText: 'A. Probar la capacidad del modelo para detectar patrones sutiles en los datos.', isCorrect: false, feedback: 'Incorrecto. Esto se relaciona con la exactitud y la complejidad del modelo.' },
            { answerText: 'B. Probar cómo cambia el rendimiento del modelo cuando se cambian sus entradas.', isCorrect: true, feedback: 'Correcto. Un test de sensibilidad evalúa cómo reacciona el modelo a pequeños cambios en los datos de entrada, para asegurar que su comportamiento sea estable y predecible.' },
            { answerText: 'C. Probar cómo el modelo responde a los cambios en el código.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de regresión.' },
            { answerText: 'D. Probar si el modelo es insensible a los datos de entrenamiento.', isCorrect: false, feedback: 'Incorrecto. Un modelo debe ser sensible a sus datos de entrenamiento.' },
        ],
    },
    {
        questionText: '¿Qué es el "desplazamiento del concepto" (concept drift) en la prueba de IA?',
        answerOptions: [
            { answerText: 'A. Cuando el modelo se desvía de su camino de entrenamiento original.', isCorrect: false, feedback: 'Incorrecto. Esto no es una definición estándar de concept drift.' },
            { answerText: 'B. Cuando la relación entre las variables de entrada y la variable de salida cambia con el tiempo.', isCorrect: true, feedback: 'Correcto. El "desplazamiento del concepto" ocurre cuando los patrones que el modelo aprendió durante el entrenamiento ya no son válidos porque el significado del concepto que el modelo debe predecir ha cambiado en el mundo real.' },
            { answerText: 'C. Cuando el modelo se vuelve más lento con el tiempo.', isCorrect: false, feedback: 'Incorrecto. Esto se relaciona con la degradación del rendimiento.' },
            { answerText: 'D. Cuando el modelo se sobreajusta a los datos de prueba.', isCorrect: false, feedback: 'Incorrecto. El sobreajuste es un problema de entrenamiento, no un desplazamiento del concepto.' },
        ],
    },
    {
        questionText: '¿Cuál es el rol de un "test de equidad" (fairness test)?',
        answerOptions: [
            { answerText: 'A. Asegurar que los datos de entrenamiento sean de alta calidad.', isCorrect: false, feedback: 'Incorrecto. Eso es la validación de los datos.' },
            { answerText: 'B. Asegurar que el modelo no tenga un rendimiento sesgado para subgrupos de la población.', isCorrect: true, feedback: 'Correcto. Las pruebas de equidad son esenciales para la ética de la IA, asegurando que las decisiones del modelo sean imparciales y justas para todos los grupos de usuarios.' },
            { answerText: 'C. Probar la seguridad del modelo.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de seguridad.' },
            { answerText: 'D. Probar el rendimiento del modelo bajo carga.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de rendimiento.' },
        ],
    },
    {
        questionText: '¿Qué es una prueba de "confiabilidad" (reliability) en un sistema de IA?',
        answerOptions: [
            { answerText: 'A. Probar la capacidad del modelo para funcionar correctamente y de manera consistente.', isCorrect: true, feedback: 'Correcto. La confiabilidad se refiere a la capacidad del sistema para realizar sus funciones según lo previsto, de manera consistente y sin fallos, en condiciones específicas.' },
            { answerText: 'B. Probar la velocidad del modelo.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de rendimiento.' },
            { answerText: 'C. Probar la seguridad del modelo.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de seguridad.' },
            { answerText: 'D. Probar la usabilidad del modelo.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de usabilidad.' },
        ],
    },
    {
        questionText: '¿Qué es un "test de robustez" (robustness test) para un sistema de IA?',
        answerOptions: [
            { answerText: 'A. Probar la capacidad del modelo para resistir entradas anómalas sin fallar.', isCorrect: true, feedback: 'Correcto. Un test de robustez evalúa la resistencia del modelo a entradas que son ligeramente diferentes o "ruidosas" en comparación con los datos de entrenamiento, asegurando que el modelo no se degrade en el rendimiento.' },
            { answerText: 'B. Probar la capacidad del modelo para funcionar en diferentes plataformas.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de compatibilidad.' },
            { answerText: 'C. Probar la velocidad de predicción del modelo.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de rendimiento.' },
            { answerText: 'D. Probar el modelo con datos de alta calidad.', isCorrect: false, feedback: 'Incorrecto. Los test de robustez se centran en datos de baja o atípica calidad.' },
        ],
    },
    {
        questionText: '¿Qué es un "test de seguridad" (security test)?',
        answerOptions: [
            { answerText: 'A. Probar que el modelo esté protegido contra ataques maliciosos.', isCorrect: true, feedback: 'Correcto. Un test de seguridad en IA evalúa vulnerabilidades como la manipulación de datos, el envenenamiento del modelo o la exfiltración de información sensible.' },
            { answerText: 'B. Probar que el modelo sea justo.', isCorrect: false, feedback: 'Incorrecto. Eso es una prueba de equidad.' },
            { answerText: 'C. Probar que el modelo sea confiable.', isCorrect: false, feedback: 'Incorrecto. Eso es una prueba de confiabilidad.' },
            { answerText: 'D. Probar que el modelo sea rápido.', isCorrect: false, feedback: 'Incorrecto. Eso es una prueba de rendimiento.' },
        ],
    },
    {
        questionText: '¿Qué es la "explicabilidad" (explainability) en la prueba de IA?',
        answerOptions: [
            { answerText: 'A. La capacidad del modelo de procesar datos sin problemas.', isCorrect: false, feedback: 'Incorrecto. Eso se refiere a la eficiencia.' },
            { answerText: 'B. La capacidad de entender por qué un modelo de IA toma una decisión específica.', isCorrect: true, feedback: 'Correcto. La explicabilidad es fundamental para la confianza, la depuración y la auditoría. Permite a los probadores y a los usuarios entender la lógica detrás de las predicciones del modelo.' },
            { answerText: 'C. La capacidad de un modelo de IA para ser escalado.', isCorrect: false, feedback: 'Incorrecto. Eso se refiere a la escalabilidad.' },
            { answerText: 'D. La capacidad de un modelo de IA para ser optimizado.', isCorrect: false, feedback: 'Incorrecto. Eso se refiere a la optimización del rendimiento.' },
        ],
    },
    {
        questionText: '¿Qué se evalúa en la "prueba de rendimiento" (performance testing) de un sistema de IA?',
        answerOptions: [
            { answerText: 'A. La seguridad del sistema.', isCorrect: false, feedback: 'Incorrecto. Eso es una prueba de seguridad.' },
            { answerText: 'B. La velocidad y la eficiencia del modelo bajo diferentes cargas de trabajo.', isCorrect: true, feedback: 'Correcto. La prueba de rendimiento evalúa la velocidad, la capacidad de respuesta y la estabilidad del sistema de IA en diversas condiciones de carga, para asegurar que cumpla con los requisitos de velocidad y latencia.' },
            { answerText: 'C. La usabilidad del sistema.', isCorrect: false, feedback: 'Incorrecto. Eso es una prueba de usabilidad.' },
            { answerText: 'D. La equidad del modelo.', isCorrect: false, feedback: 'Incorrecto. Eso es una prueba de equidad.' },
        ],
    },
    {
        questionText: '¿Cuál es la función del "test de regresión" en la prueba de IA?',
        answerOptions: [
            { answerText: 'A. Probar si el modelo puede retroceder a una versión anterior.', isCorrect: false, feedback: 'Incorrecto. La regresión se refiere a la introducción de nuevos errores.' },
            { answerText: 'B. Probar si los cambios en el modelo han introducido nuevos defectos o han roto la funcionalidad existente.', isCorrect: true, feedback: 'Correcto. Los test de regresión se utilizan para verificar que las actualizaciones, correcciones o cambios en el modelo o en el código no han causado un deterioro del rendimiento o la introducción de nuevos errores.' },
            { answerText: 'C. Probar el rendimiento del modelo.', isCorrect: false, feedback: 'Incorrecto. Eso es una prueba de rendimiento.' },
            { answerText: 'D. Probar la seguridad del modelo.', isCorrect: false, feedback: 'Incorrecto. Eso es una prueba de seguridad.' },
        ],
    },
    {
        questionText: '¿Qué es el "desplazamiento del modelo" (model drift)?',
        answerOptions: [
            { answerText: 'A. Cuando el modelo se mueve de una plataforma a otra.', isCorrect: false, feedback: 'Incorrecto. Eso se refiere a la migración.' },
            { answerText: 'B. Cuando el rendimiento del modelo se degrada con el tiempo en producción debido a cambios en los datos de entrada.', isCorrect: true, feedback: 'Correcto. El model drift ocurre cuando las características estadísticas de los datos de entrada cambian con el tiempo, lo que causa que las predicciones del modelo se vuelvan menos precisas o relevantes.' },
            { answerText: 'C. Cuando el modelo se sobreajusta a los datos de entrenamiento.', isCorrect: false, feedback: 'Incorrecto. El sobreajuste es un problema de entrenamiento, no un desplazamiento del modelo.' },
            { answerText: 'D. Cuando el modelo se vuelve más lento con el tiempo.', isCorrect: false, feedback: 'Incorrecto. Eso se relaciona con la degradación del rendimiento.' },
        ],
    },
    {
        questionText: '¿Cuál es una métrica clave para evaluar un modelo de clasificación?',
        answerOptions: [
            { answerText: 'A. Error cuadrático medio (MSE).', isCorrect: false, feedback: 'Incorrecto. MSE es una métrica para modelos de regresión.' },
            { answerText: 'B. Exactitud (Accuracy).', isCorrect: true, feedback: 'Correcto. La exactitud es una métrica común en clasificación, que mide la proporción de predicciones correctas sobre el total de predicciones.' },
            { answerText: 'C. R-cuadrado (R-squared).', isCorrect: false, feedback: 'Incorrecto. R-cuadrado es una métrica para modelos de regresión.' },
            { answerText: 'D. Desviación estándar.', isCorrect: false, feedback: 'Incorrecto. La desviación estándar es una medida de dispersión de datos.' },
        ],
    },
    {
        questionText: '¿Qué es una prueba de "integración" en el contexto de la prueba de IA?',
        answerOptions: [
            { answerText: 'A. Probar la integración del modelo de IA con otros componentes del sistema.', isCorrect: true, feedback: 'Correcto. La prueba de integración asegura que el modelo de IA funcione sin problemas cuando se combina con otras partes del software, como bases de datos, APIs o la interfaz de usuario.' },
            { answerText: 'B. Probar la integración de datos de entrenamiento.', isCorrect: false, feedback: 'Incorrecto. La integración de datos es parte de la preparación de datos.' },
            { answerText: 'C. Probar la integración de los probadores con los desarrolladores.', isCorrect: false, feedback: 'Incorrecto. Esto se refiere a la colaboración, no a la prueba de integración.' },
            { answerText: 'D. Probar la integración del modelo en la nube.', isCorrect: false, feedback: 'Incorrecto. Eso es parte de la prueba de despliegue.' },
        ],
    },
    {
        questionText: '¿Qué es un "ataque de envenenamiento" (poisoning attack) en un sistema de IA?',
        answerOptions: [
            { answerText: 'A. Cuando un modelo de IA se sobreajusta.', isCorrect: false, feedback: 'Incorrecto. El sobreajuste es un problema de entrenamiento, no un ataque.' },
            { answerText: 'B. Cuando un atacante altera los datos de entrenamiento para manipular el comportamiento del modelo.', isCorrect: true, feedback: 'Correcto. Un ataque de envenenamiento busca introducir datos maliciosos en el conjunto de entrenamiento para corromper el modelo de IA, forzándolo a aprender patrones defectuosos o sesgados.' },
            { answerText: 'C. Cuando un modelo de IA falla al predecir un resultado.', isCorrect: false, feedback: 'Incorrecto. Un fallo de predicción no es un ataque.' },
            { answerText: 'D. Cuando un modelo de IA es demasiado lento.', isCorrect: false, feedback: 'Incorrecto. Esto se relaciona con el rendimiento.' },
        ],
    },
    {
        questionText: '¿Cuál es el propósito del "test de equidad" (fairness test) en la prueba de IA?',
        answerOptions: [
            { answerText: 'A. Asegurar que el modelo no tenga un rendimiento sesgado para subgrupos de la población.', isCorrect: true, feedback: 'Correcto. Las pruebas de equidad son esenciales para la ética de la IA, asegurando que las decisiones del modelo sean imparciales y justas para todos los grupos de usuarios.' },
            { answerText: 'B. Asegurar que los datos de entrenamiento sean de alta calidad.', isCorrect: false, feedback: 'Incorrecto. Eso es la validación de los datos.' },
            { answerText: 'C. Probar la seguridad del modelo.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de seguridad.' },
            { answerText: 'D. Probar el rendimiento del modelo bajo carga.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de rendimiento.' },
        ],
    },
    {
        questionText: '¿Qué es el "desplazamiento de los datos" (data drift)?',
        answerOptions: [
            { answerText: 'A. Cuando el modelo se mueve de una plataforma a otra.', isCorrect: false, feedback: 'Incorrecto. Eso se refiere a la migración.' },
            { answerText: 'B. Cuando las propiedades estadísticas de las variables de entrada del modelo cambian con el tiempo.', isCorrect: true, feedback: 'Correcto. El "desplazamiento de los datos" se produce cuando la distribución de los datos de entrada en producción se desvía de la distribución de los datos con los que el modelo fue entrenado. Esto puede llevar a una disminución del rendimiento del modelo.' },
            { answerText: 'C. Cuando el modelo se sobreajusta a los datos de entrenamiento.', isCorrect: false, feedback: 'Incorrecto. El sobreajuste es un problema de entrenamiento.' },
            { answerText: 'D. Cuando el modelo se vuelve más lento con el tiempo.', isCorrect: false, feedback: 'Incorrecto. Esto se relaciona con la degradación del rendimiento.' },
        ],
    },
    {
        questionText: '¿Qué es la "explicabilidad" (explainability) de un sistema de IA?',
        answerOptions: [
            { answerText: 'A. La capacidad del modelo para procesar datos sin problemas.', isCorrect: false, feedback: 'Incorrecto. Eso se refiere a la eficiencia.' },
            { answerText: 'B. La capacidad de entender y comunicar por qué un modelo de IA toma una decisión específica.', isCorrect: true, feedback: 'Correcto. La explicabilidad es crucial para la confianza y la depuración, permitiendo a los probadores y usuarios comprender el razonamiento detrás de las predicciones del modelo.' },
            { answerText: 'C. La capacidad de un modelo de IA para ser escalado.', isCorrect: false, feedback: 'Incorrecto. Eso se refiere a la escalabilidad.' },
            { answerText: 'D. La capacidad de un modelo de IA para ser optimizado.', isCorrect: false, feedback: 'Incorrecto. Eso se refiere a la optimización del rendimiento.' },
        ],
    },
    {
        questionText: '¿Cuál es un enfoque común para probar la "trazabilidad" de un modelo de IA?',
        answerOptions: [
            { answerText: 'A. Probar la seguridad del modelo.', isCorrect: false, feedback: 'Incorrecto. Eso es una prueba de seguridad.' },
            { answerText: 'B. Mapear las predicciones del modelo a los datos de entrada y decisiones de diseño originales.', isCorrect: true, feedback: 'Correcto. La trazabilidad se asegura al vincular las predicciones del modelo con los datos, los requisitos y el código de desarrollo, lo que permite la auditoría y la depuración.' },
            { answerText: 'C. Realizar pruebas de carga y estrés.', isCorrect: false, feedback: 'Incorrecto. Esto es para la prueba de rendimiento.' },
            { answerText: 'D. Generar un informe de rendimiento del modelo.', isCorrect: false, feedback: 'Incorrecto. Un informe de rendimiento es un resultado de la prueba, pero no un enfoque para probar la trazabilidad.' },
        ],
    },
    {
        questionText: '¿Qué es el "desplazamiento del concepto" (concept drift)?',
        answerOptions: [
            { answerText: 'A. Cuando la relación entre las variables de entrada y la variable de salida cambia con el tiempo.', isCorrect: true, feedback: 'Correcto. El "desplazamiento del concepto" ocurre cuando los patrones que el modelo aprendió durante el entrenamiento ya no son válidos porque el significado del concepto que el modelo debe predecir ha cambiado en el mundo real.' },
            { answerText: 'B. Cuando el modelo se desvía de su camino de entrenamiento original.', isCorrect: false, feedback: 'Incorrecto. Esto no es una definición estándar de concept drift.' },
            { answerText: 'C. Cuando el modelo se vuelve más lento con el tiempo.', isCorrect: false, feedback: 'Incorrecto. Esto se relaciona con la degradación del rendimiento.' },
            { answerText: 'D. Cuando el modelo se sobreajusta a los datos de prueba.', isCorrect: false, feedback: 'Incorrecto. El sobreajuste es un problema de entrenamiento, no un desplazamiento del concepto.' },
        ],
    },
    {
        questionText: '¿Qué se busca en una prueba de "monitoreo del modelo" (model monitoring)?',
        answerOptions: [
            { answerText: 'A. Evaluar el rendimiento del modelo en producción y detectar el "desplazamiento del modelo" (model drift).', isCorrect: true, feedback: 'Correcto. El monitoreo del modelo en producción es esencial para asegurar que su rendimiento no se degrade con el tiempo, un fenómeno conocido como "model drift" causado por cambios en los datos del mundo real.' },
            { answerText: 'B. Probar el modelo antes de que se despliegue en producción.', isCorrect: false, feedback: 'Incorrecto. Esto es parte de las pruebas pre-despliegue, no del monitoreo continuo.' },
            { answerText: 'C. Probar la eficiencia de los algoritmos de entrenamiento.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de eficiencia del algoritmo.' },
            { answerText: 'D. Probar la seguridad de los datos de entrada.', isCorrect: false, feedback: 'Incorrecto. Esto es parte de las pruebas de seguridad y validación de datos.' },
        ],
    },
    {
        questionText: '¿Cuál es la diferencia entre "model drift" y "concept drift"?',
        answerOptions: [
            { answerText: 'A. No hay diferencia; ambos términos se refieren a lo mismo.', isCorrect: false, feedback: 'Incorrecto. Aunque están relacionados, son conceptos distintos.' },
            { answerText: 'B. El "model drift" es la degradación del rendimiento del modelo, mientras que el "concept drift" es el cambio en la relación entre entradas y salidas.', isCorrect: true, feedback: 'Correcto. El "model drift" es el síntoma (el rendimiento se degrada), y el "concept drift" es una de las posibles causas (los patrones subyacentes cambian).' },
            { answerText: 'C. El "model drift" se refiere a la seguridad, y el "concept drift" al rendimiento.', isCorrect: false, feedback: 'Incorrecto. Ambos se relacionan con el rendimiento del modelo a lo largo del tiempo.' },
            { answerText: 'D. El "model drift" es un problema de entrenamiento, y el "concept drift" es un problema de producción.', isCorrect: false, feedback: 'Incorrecto. Ambos son problemas que se manifiestan más prominentemente en producción.' },
        ],
    },
    {
        questionText: '¿Qué se evalúa en una prueba de "rendimiento" (performance testing) de un modelo de IA?',
        answerOptions: [
            { answerText: 'A. La velocidad de inferencia y la eficiencia del uso de recursos.', isCorrect: true, feedback: 'Correcto. La prueba de rendimiento se centra en métricas como el tiempo de respuesta, el rendimiento (throughput) y el uso de CPU/GPU/memoria del modelo de IA bajo carga.' },
            { answerText: 'B. La seguridad del modelo.', isCorrect: false, feedback: 'Incorrecto. Eso es una prueba de seguridad.' },
            { answerText: 'C. La confiabilidad del modelo.', isCorrect: false, feedback: 'Incorrecto. La confiabilidad se refiere a la consistencia y fiabilidad de las predicciones.' },
            { answerText: 'D. La usabilidad del sistema.', isCorrect: false, feedback: 'Incorrecto. Eso es una prueba de usabilidad.' },
        ],
    },
    {
        questionText: '¿Qué es un "test de seguridad" (security test) en el contexto de IA?',
        answerOptions: [
            { answerText: 'A. Probar la resistencia del modelo a ataques como el envenenamiento o la evasión.', isCorrect: true, feedback: 'Correcto. Los test de seguridad en IA buscan vulnerabilidades que puedan ser explotadas por atacantes para manipular o comprometer el modelo.' },
            { answerText: 'B. Probar la velocidad de predicción del modelo.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de rendimiento.' },
            { answerText: 'C. Probar la facilidad de uso de la interfaz de usuario.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de usabilidad.' },
            { answerText: 'D. Probar la equidad del modelo.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de equidad.' },
        ],
    },
    {
        questionText: '¿Qué se evalúa en un "test de invariancia" (invariance test)?',
        answerOptions: [
            { answerText: 'A. Probar si el modelo da la misma predicción después de una transformación relevante de los datos.', isCorrect: false, feedback: 'Incorrecto. El test de invariancia se enfoca en transformaciones *irrelevantes* que no deben cambiar la predicción.' },
            { answerText: 'B. Probar la capacidad del modelo para resistir entradas ruidosas.', isCorrect: false, feedback: 'Incorrecto. Esto es un test de robustez.' },
            { answerText: 'C. Probar si el modelo da la misma predicción después de una transformación irrelevante de los datos.', isCorrect: true, feedback: 'Correcto. Un test de invariancia verifica que una transformación irrelevante para el significado de la entrada (como cambiar el brillo de una imagen) no altere la predicción del modelo.' },
            { answerText: 'D. Probar la velocidad de inferencia del modelo.', isCorrect: false, feedback: 'Incorrecto. Esto es una prueba de rendimiento.' },
        ],
    },
    {
        questionText: '¿Qué es una prueba de "regresión" en la prueba de IA?',
        answerOptions: [
            { answerText: 'A. Probar la capacidad del modelo para volver a una versión anterior.', isCorrect: false, feedback: 'Incorrecto. El término se refiere a la reintroducción de defectos.' },
            { answerText: 'B. Probar si los cambios en el modelo o en los datos han introducido nuevos defectos o han roto la funcionalidad existente.', isCorrect: true, feedback: 'Correcto. La prueba de regresión se realiza para asegurar que las modificaciones no han degradado el rendimiento o la funcionalidad del modelo.' },
            { answerText: 'C. Probar si el modelo puede funcionar con datos de alta calidad.', isCorrect: false, feedback: 'Incorrecto. La prueba de regresión no se centra en la calidad de los datos de entrada, sino en el impacto de los cambios.' },
            { answerText: 'D. Probar la capacidad del modelo para manejar una gran cantidad de datos.', isCorrect: false, feedback: 'Incorrecto. Eso es una prueba de escalabilidad.' },
        ],
    },
    {
        questionText: '¿Cuál de los siguientes es un ejemplo de un "falso positivo" en un sistema de IA?',
        answerOptions: [
            { answerText: 'A. Un sistema de detección de spam marca un correo normal como spam.', isCorrect: true, feedback: 'Correcto. Un falso positivo ocurre cuando el modelo predice incorrectamente que un evento ha ocurrido (positivo) cuando en realidad no fue así.' },
            { answerText: 'B. Un sistema de detección de spam no marca un correo spam como spam.', isCorrect: false, feedback: 'Incorrecto. Esto es un falso negativo.' },
            { answerText: 'C. Un sistema de detección de spam marca un correo spam como spam.', isCorrect: false, feedback: 'Incorrecto. Esto es un verdadero positivo.' },
            { answerText: 'D. Un sistema de detección de spam no marca un correo normal como spam.', isCorrect: false, feedback: 'Incorrecto. Esto es un verdadero negativo.' },
        ],
    },
    {
        questionText: '¿Qué es un "ataque de evasión" (evasion attack) en la seguridad de la IA?',
        answerOptions: [
            { answerText: 'A. Cuando un modelo de IA evita hacer una predicción.', isCorrect: false, feedback: 'Incorrecto. Un ataque de evasión se refiere a la manipulación de los datos de entrada.' },
            { answerText: 'B. Cuando un atacante altera los datos de entrada para que el modelo haga una predicción incorrecta.', isCorrect: true, feedback: 'Correcto. Un ataque de evasión implica modificar ligeramente los datos de entrada para engañar al modelo y hacer que clasifique un ejemplo legítimo de manera incorrecta, sin que el modelo detecte la manipulación.' },
            { answerText: 'C. Cuando un modelo de IA se sobreajusta a los datos de entrenamiento.', isCorrect: false, feedback: 'Incorrecto. El sobreajuste es un problema de entrenamiento, no un ataque.' },
            { answerText: 'D. Cuando un modelo de IA es demasiado lento.', isCorrect: false, feedback: 'Incorrecto. Esto se relaciona con el rendimiento.' },
        ],
    },
];

const shuffleArray = (array) => {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const QuizApp = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });
    const [showScore, setShowScore] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [shuffledQuestions, setShuffledQuestions] = useState([]);

    // Initialize and shuffle questions on component load
    useEffect(() => {
        startNewQuiz();
    }, []);

    const startNewQuiz = () => {
        // Create a new array to avoid modifying the original
        const shuffledQuestions = shuffleArray(questionsData);
        // Shuffle the answers for each question
        const shuffledQuestionsWithShuffledAnswers = shuffledQuestions.map(q => ({
            ...q,
            answerOptions: shuffleArray(q.answerOptions)
        }));
        setShuffledQuestions(shuffledQuestionsWithShuffledAnswers);
        setCurrentQuestionIndex(0);
        setScore({ correct: 0, incorrect: 0 });
        setShowScore(false);
        setShowFeedback(false);
        setFeedbackMessage('');
    };

    const handleAnswerOptionClick = (isCorrect, feedback) => {
        if (isCorrect) {
            setScore((prevScore) => ({ ...prevScore, correct: prevScore.correct + 1 }));
            setFeedbackMessage('¡Correcto! ' + feedback);
        } else {
            setScore((prevScore) => ({ ...prevScore, incorrect: prevScore.incorrect + 1 }));
            setFeedbackMessage('Incorrecto. ' + feedback);
        }

        setShowFeedback(true);

        setTimeout(() => {
            const nextQuestion = currentQuestionIndex + 1;
            if (nextQuestion < 40) {
                setCurrentQuestionIndex(nextQuestion);
                setShowFeedback(false);
                setFeedbackMessage('');
            } else {
                setShowScore(true);
            }
        }, 5000); // 5-second delay to read feedback
    };

    if (showScore) {
        return (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Resultados del Cuestionario</h1>
                    <p className="text-xl text-gray-700 mb-4">
                        Has completado las 40 preguntas.
                    </p>
                    <div className="mb-8">
                        <div className="text-2xl font-semibold text-green-600">
                            Respuestas correctas: {score.correct}
                        </div>
                        <div className="text-2xl font-semibold text-red-600">
                            Respuestas incorrectas: {score.incorrect}
                        </div>
                    </div>
                    <button
                        onClick={startNewQuiz}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Reiniciar Cuestionario
                    </button>
                </div>
            </div>
        );
    }

    if (shuffledQuestions.length === 0) {
        return (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
                <div className="text-gray-600">Cargando preguntas...</div>
            </div>
        );
    }

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;

    return (
        <div className="bg-gray-100 min-h-screen font-sans flex flex-col items-center justify-center p-4">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-3xl">
                <div className="text-center mb-6">
                    <div className="text-gray-600 text-lg mb-2">
                        Pregunta {questionNumber} / 40
                    </div>
                    <div className="text-4xl font-extrabold text-blue-600 mb-4">
                        ISTQB AI Tester
                    </div>
                </div>

                <div className="relative p-6 bg-blue-50 rounded-xl shadow-inner mb-6 transition-all duration-500 transform hover:scale-101">
                    <div className="text-xl font-medium text-gray-800 leading-relaxed">
                        {currentQuestion.questionText}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.answerOptions.map((answerOption, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerOptionClick(answerOption.isCorrect, answerOption.feedback)}
                            className={`
                                text-left p-4 rounded-xl font-semibold transition-all duration-300
                                ${showFeedback ? (answerOption.isCorrect ? 'bg-green-100 text-green-800 border-2 border-green-500' : 'bg-red-100 text-red-800 border-2 border-red-500') : 'bg-gray-50 hover:bg-blue-100 text-gray-700'}
                                shadow-sm hover:shadow-lg transform hover:scale-105
                            `}
                            disabled={showFeedback}
                        >
                            {answerOption.answerText}
                        </button>
                    ))}
                </div>

                {showFeedback && (
                    <div className="mt-6 p-4 rounded-xl shadow-lg bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 font-semibold">
                        {feedbackMessage}
                    </div>
                )}
            </div>

            <div className="mt-6 w-full max-w-3xl flex justify-between text-lg font-bold">
                <div className="bg-green-500 text-white py-2 px-4 rounded-full shadow-lg">
                    Correctas: {score.correct}
                </div>
                <div className="bg-red-500 text-white py-2 px-4 rounded-full shadow-lg">
                    Incorrectas: {score.incorrect}
                </div>
            </div>
        </div>
    );
};

export default QuizApp;
