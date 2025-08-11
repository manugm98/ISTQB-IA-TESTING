import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

// Bank of over 100 questions for the CT-AI Syllabus.
const questionBank = [
  {
    question: "¿Qué tipo de prueba se centra en la capacidad de un modelo de IA para manejar datos de entrada que difieren de los datos de entrenamiento?",
    options: ["Prueba de sesgo", "Prueba de robustez", "Prueba de caja negra", "Prueba de caja blanca"],
    correctAnswerIndex: 1,
  },
  {
    question: "El concepto de 'explicabilidad' en la IA (XAI) se refiere a:",
    options: ["La velocidad de inferencia de un modelo", "La capacidad de un modelo para generar texto", "Qué tan bien podemos entender por qué un modelo tomó una decisión específica", "La complejidad del algoritmo de entrenamiento"],
    correctAnswerIndex: 2,
  },
  {
    question: "¿Cuál de las siguientes es una preocupación clave al probar un sistema de IA?",
    options: ["La eficiencia del servidor web", "La estabilidad de la base de datos", "El comportamiento impredecible del modelo en entornos no vistos", "La velocidad de carga de la página"],
    correctAnswerIndex: 2,
  },
  {
    question: "En las pruebas de sistemas de IA, ¿qué es un 'adversario'?",
    options: ["Un competidor del mercado", "Un tipo de ataque para engañar al modelo", "Un miembro del equipo de pruebas", "Un fallo en el código"],
    correctAnswerIndex: 1,
  },
  {
    question: "Una 'tasa de falsos positivos' en un modelo de clasificación se refiere a:",
    options: ["Una predicción incorrecta de un resultado positivo", "Una predicción correcta de un resultado positivo", "Una predicción incorrecta de un resultado negativo", "Una predicción correcta de un resultado negativo"],
    correctAnswerIndex: 0,
  },
  {
    question: "El 'problema de la generalización' en el aprendizaje automático se relaciona con:",
    options: ["La capacidad del modelo para aprender de los datos de entrenamiento", "La capacidad del modelo para rendir bien con datos nuevos y no vistos", "La velocidad de entrenamiento del modelo", "El tamaño del conjunto de datos de entrenamiento"],
    correctAnswerIndex: 1,
  },
  {
    question: "¿Qué es el 'aprendizaje por refuerzo'?",
    options: ["Un método de aprendizaje supervisado", "Un método de aprendizaje no supervisado", "Un método en el que un agente aprende a tomar decisiones en un entorno para maximizar una recompensa", "Un método para agrupar datos similares"],
    correctAnswerIndex: 2,
  },
  {
    question: "En las pruebas de modelos de IA, la 'prueba de sesgo' es fundamental para:",
    options: ["Asegurar que el modelo no sea demasiado preciso", "Garantizar que el modelo funciona de manera justa en todos los grupos de datos", "Reducir la complejidad del modelo", "Mejorar la velocidad de inferencia"],
    correctAnswerIndex: 1,
  },
  {
    question: "¿Cuál es un desafío común en la obtención de datos para entrenar modelos de IA?",
    options: ["La alta disponibilidad de datos de alta calidad", "El tamaño de los equipos de desarrollo", "La necesidad de grandes cantidades de datos etiquetados de alta calidad", "La falta de herramientas de software"],
    correctAnswerIndex: 2,
  },
  {
    question: "¿Qué es una 'matriz de confusión' en el contexto de la evaluación de modelos de IA?",
    options: ["Un gráfico que muestra la pérdida del modelo", "Una tabla que resume el rendimiento de un algoritmo de clasificación", "Un tipo de algoritmo de clustering", "Una forma de visualización de datos"],
    correctAnswerIndex: 1,
  },
  {
    question: "La 'prueba de caja negra' de un sistema de IA implica probar:",
    options: ["Los algoritmos internos del modelo", "La interfaz de usuario sin conocimiento del código", "El comportamiento del sistema de IA sin conocimiento de su funcionamiento interno", "El hardware del servidor"],
    correctAnswerIndex: 2,
  },
  {
    question: "En las pruebas de IA, ¿qué significa 'sobreajuste' (overfitting)?",
    options: ["El modelo tiene un rendimiento deficiente en los datos de entrenamiento", "El modelo se ha ajustado demasiado bien a los datos de entrenamiento y no generaliza a nuevos datos", "El modelo es demasiado simple para los datos", "El modelo tarda mucho en entrenarse"],
    correctAnswerIndex: 1,
  },
  {
    question: "El 'conjunto de datos de validación' se utiliza para:",
    options: ["Entrenar el modelo", "Probar el modelo final", "Ajustar los hiperparámetros del modelo durante el entrenamiento", "Generar nuevas características"],
    correctAnswerIndex: 2,
  },
  {
    question: "¿Qué es un 'conjunto de datos de prueba'?",
    options: ["Los datos utilizados para entrenar el modelo", "Los datos utilizados para ajustar los hiperparámetros", "Los datos utilizados para evaluar el rendimiento final del modelo, que no se vieron durante el entrenamiento ni la validación", "Todos los datos disponibles"],
    correctAnswerIndex: 2,
  },
  {
    question: "Un 'falso negativo' en un modelo de detección de enfermedades es:",
    options: ["El modelo detecta una enfermedad cuando no está presente", "El modelo no detecta una enfermedad cuando sí está presente", "El modelo detecta correctamente una enfermedad", "El modelo no detecta una enfermedad cuando no está presente"],
    correctAnswerIndex: 1,
  },
  {
    question: "La 'prueba de equidad' (fairness testing) se utiliza para:",
    options: ["Asegurar que el modelo sea más rápido", "Garantizar que el modelo toma decisiones justas e imparciales para diferentes grupos", "Mejorar la precisión del modelo", "Probar la seguridad del modelo"],
    correctAnswerIndex: 1,
  },
  {
    question: "En el contexto de la IA, 'deriva de datos' (data drift) se refiere a:",
    options: ["Un cambio en la distribución de los datos de entrada a lo largo del tiempo", "Un error en el código del modelo", "Una mejora en el rendimiento del modelo", "Una pérdida de datos durante el entrenamiento"],
    correctAnswerIndex: 0,
  },
  {
    question: "¿Qué es la 'confianza del modelo'?",
    options: ["La certeza subjetiva del probador en el modelo", "Una métrica que mide la probabilidad de que la predicción del modelo sea correcta", "El número de parámetros del modelo", "La velocidad de procesamiento del modelo"],
    correctAnswerIndex: 1,
  },
  {
    question: "La 'prueba de robustez' de un modelo de IA se enfoca en:",
    options: ["La capacidad del modelo para resistir entradas maliciosas", "La velocidad de inferencia", "La capacidad del modelo para generalizar", "El tamaño del modelo"],
    correctAnswerIndex: 0,
  },
  {
    question: "El 'ciclo de vida de un sistema de IA' incluye:",
    options: ["Solo el entrenamiento y la implementación", "Solo la recopilación de datos y el modelado", "Desde la concepción hasta el despliegue y el mantenimiento en producción", "Solo el diseño de la interfaz de usuario"],
    correctAnswerIndex: 2,
  },
  {
    question: "¿Cuál es el propósito principal de las 'pruebas de regresión' en un sistema de IA?",
    options: ["Asegurar que los nuevos cambios no introduzcan fallos en la funcionalidad existente", "Medir la precisión del modelo", "Ajustar los hiperparámetros", "Evaluar la seguridad del modelo"],
    correctAnswerIndex: 0,
  },
  {
    question: "¿Qué es un 'modelo de aprendizaje supervisado'?",
    options: ["Un modelo que aprende sin datos etiquetados", "Un modelo que se entrena con datos etiquetados, es decir, con pares de entrada y salida correctos", "Un modelo que aprende a través de la interacción con un entorno", "Un modelo que agrupa datos similares"],
    correctAnswerIndex: 1,
  },
  {
    question: "La 'falta de datos' es un problema común que puede llevar a:",
    options: ["Un mejor rendimiento del modelo", "Un sobreajuste del modelo", "Una generalización deficiente y un rendimiento subóptimo", "Un entrenamiento más rápido"],
    correctAnswerIndex: 2,
  },
  {
    question: "¿Qué es una 'prueba de caja blanca' para un modelo de IA?",
    options: ["Probar el modelo sin conocer su funcionamiento interno", "Probar el modelo con conocimiento del código interno y los algoritmos", "Probar la interfaz de usuario del sistema", "Probar la infraestructura del servidor"],
    correctAnswerIndex: 1,
  },
  {
    question: "El 'problema del caballo en blanco y negro' en el entrenamiento de IA ilustra:",
    options: ["Un problema con la calidad de la imagen", "Un sesgo de datos, donde el modelo asocia incorrectamente una etiqueta con una característica irrelevante", "Un problema de sobreajuste", "Un problema de subajuste"],
    correctAnswerIndex: 1,
  },
  {
    question: "La 'medida F1' es la media armónica de:",
    options: ["Precisión y cobertura", "Tasa de verdaderos positivos y tasa de falsos positivos", "Exactitud y precisión", "Precisión y recall"],
    correctAnswerIndex: 3,
  },
  {
    question: "¿Qué es la 'prueba de adversarios'?",
    options: ["Un tipo de prueba de estrés", "Una prueba que evalúa la capacidad de un modelo de IA para resistir ataques que intentan engañar al modelo", "Un tipo de prueba de usabilidad", "Una prueba de rendimiento"],
    correctAnswerIndex: 1,
  },
  {
    question: "El concepto de 'data augmentation' se utiliza para:",
    options: ["Reducir el tamaño de los datos de entrenamiento", "Aumentar artificialmente la cantidad de datos de entrenamiento para mejorar la generalización", "Aumentar la velocidad de entrenamiento", "Ajustar los hiperparámetros"],
    correctAnswerIndex: 1,
  },
  {
    question: "En las pruebas de IA, ¿qué es 'deriva del modelo' (model drift)?",
    options: ["Cuando el modelo cambia su comportamiento debido a cambios en los datos de entrada", "Un cambio en los requisitos del usuario", "Un error de software en la implementación", "Cuando el modelo se vuelve más preciso con el tiempo"],
    correctAnswerIndex: 0,
  },
  {
    question: "La 'prueba de caja gris' para IA combina elementos de:",
    options: ["Pruebas de usabilidad y pruebas de rendimiento", "Pruebas de regresión y pruebas de integración", "Pruebas de caja blanca y pruebas de caja negra", "Pruebas de seguridad y pruebas de carga"],
    correctAnswerIndex: 2,
  },
  {
    question: "Un 'sesgo de género' en un modelo de IA es un tipo de:",
    options: ["Sesgo de código", "Sesgo de datos", "Sesgo de infraestructura", "Sesgo de rendimiento"],
    correctAnswerIndex: 1,
  },
  {
    question: "La 'prueba de la interfaz de programación de aplicaciones' (API) para un sistema de IA se centra en:",
    options: ["La interfaz de usuario", "La funcionalidad de la API que expone el modelo para la integración", "La velocidad de la red", "El diseño de la base de datos"],
    correctAnswerIndex: 1,
  },
  {
    question: "¿Qué es la 'prueba de portabilidad' para un sistema de IA?",
    options: ["Probar la capacidad del modelo para ser transferido y funcionar en diferentes entornos (ej. hardware, sistemas operativos)", "Probar la velocidad del modelo", "Probar la precisión del modelo", "Probar la seguridad del modelo"],
    correctAnswerIndex: 0,
  },
  {
    question: "El 'problema de subajuste' (underfitting) ocurre cuando:",
    options: ["El modelo es demasiado complejo para los datos", "El modelo no logra capturar los patrones subyacentes en los datos de entrenamiento", "El modelo generaliza bien a nuevos datos", "El modelo aprende demasiado bien los datos de entrenamiento"],
    correctAnswerIndex: 1,
  },
  {
    question: "Una 'tasa de verdaderos negativos' se refiere a:",
    options: ["Una predicción incorrecta de un resultado positivo", "Una predicción correcta de un resultado negativo", "Una predicción incorrecta de un resultado negativo", "Una predicción correcta de un resultado positivo"],
    correctAnswerIndex: 1,
  },
  {
    question: "La 'curva ROC' es una herramienta común para evaluar modelos de:",
    options: ["Clustering", "Regresión", "Clasificación", "Aprendizaje por refuerzo"],
    correctAnswerIndex: 2,
  },
  {
    question: "En el contexto de pruebas de modelos de IA, 'adversarial examples' son:",
    options: ["Datos de entrenamiento incorrectos", "Ejemplos de entrada diseñados para engañar al modelo", "Ejemplos de entrada que el modelo predice correctamente", "Ejemplos de datos de prueba"],
    correctAnswerIndex: 1,
  },
  {
    question: "¿Qué es un 'conjunto de datos de entrenamiento'?",
    options: ["El 10% de los datos utilizados para probar el modelo", "El conjunto de datos más grande utilizado para enseñar al modelo a identificar patrones", "Los datos utilizados para validar el modelo", "Los datos etiquetados por un experto"],
    correctAnswerIndex: 1,
  },
  {
    question: "El 'marco de trabajo de pruebas de equidad' se utiliza para:",
    options: ["Garantizar que el modelo sea más rápido", "Evaluar y mitigar sesgos en los datos y el modelo", "Aumentar la complejidad del modelo", "Mejorar la precisión del modelo"],
    correctAnswerIndex: 1,
  },
  {
    question: "¿Qué significa 'sensibilidad' en la evaluación de un modelo de clasificación?",
    options: ["La capacidad del modelo para identificar los verdaderos negativos", "La capacidad del modelo para identificar los verdaderos positivos", "El porcentaje de predicciones correctas", "La capacidad del modelo para evitar falsos positivos"],
    correctAnswerIndex: 1,
  },
  {
    question: "¿Qué métrica es útil para evaluar el rendimiento de un modelo de clasificación cuando las clases están desequilibradas?",
    options: ["Precisión (Accuracy)", "Tasa de error", "Puntuación F1", "Velocidad de entrenamiento"],
    correctAnswerIndex: 2,
  },
  {
    question: "Un 'modelo de caja de cristal' se refiere a un modelo de IA:",
    options: ["Que es muy preciso", "Que es fácilmente interpretable y explicable", "Que es muy grande y complejo", "Que es difícil de entender"],
    correctAnswerIndex: 1,
  },
  {
    question: "¿Qué es la 'transferencia de aprendizaje'?",
    options: ["Entrenar un modelo desde cero", "Reutilizar un modelo previamente entrenado en una nueva tarea", "Un método de aprendizaje no supervisado", "Una técnica para reducir el tamaño del modelo"],
    correctAnswerIndex: 1,
  },
  {
    question: "La 'validez de datos' es una prueba de que los datos de entrada:",
    options: ["Están en el formato correcto y dentro de los rangos esperados", "Son muy grandes", "No tienen sesgos", "Son fáciles de obtener"],
    correctAnswerIndex: 0,
  },
  {
    question: "¿Qué tipo de prueba verifica que el modelo de IA cumpla con las leyes de privacidad de datos?",
    options: ["Prueba de rendimiento", "Prueba de seguridad y privacidad", "Prueba de regresión", "Prueba de estrés"],
    correctAnswerIndex: 1,
  },
  {
    question: "El 'problema de la equidad' en la IA se refiere a:",
    options: ["El costo de ejecutar el modelo", "Si el modelo produce resultados justos e imparciales para diferentes grupos", "El tiempo que tarda el modelo en hacer una predicción", "El tamaño del modelo en la memoria"],
    correctAnswerIndex: 1,
  },
  {
    question: "Un 'ataque de envenenamiento de datos' se centra en:",
    options: ["Mejorar la precisión del modelo", "Manipular los datos de entrenamiento para corromper el modelo", "Acelerar el entrenamiento del modelo", "Reducir la complejidad del modelo"],
    correctAnswerIndex: 1,
  },
  {
    question: "¿Qué es el 'aprendizaje por pocas tomas' (few-shot learning)?",
    options: ["Entrenar un modelo con millones de datos", "Entrenar un modelo con solo unos pocos ejemplos de datos", "Un tipo de aprendizaje no supervisado", "Un método para mejorar la explicabilidad"],
    correctAnswerIndex: 1,
  },
  {
    question: "La 'prueba de estabilidad' de un modelo de IA se enfoca en:",
    options: ["Cómo se desempeña el modelo cuando se le dan entradas ligeramente diferentes", "La velocidad del modelo", "La precisión del modelo", "El tamaño del modelo"],
    correctAnswerIndex: 0,
  },
  {
    question: "¿Qué es un 'modelo de aprendizaje no supervisado'?",
    options: ["Un modelo que aprende con datos etiquetados", "Un modelo que aprende sin datos etiquetados, encontrando patrones por sí mismo", "Un modelo que aprende a través de recompensas", "Un modelo que utiliza un conjunto de datos de validación"],
    correctAnswerIndex: 1,
  },
  {
    question: "La 'prueba de robustez' es crucial para los sistemas de IA en el sector de:",
    options: ["Venta al por menor", "Comida rápida", "Vehículos autónomos", "Redes sociales"],
    correctAnswerIndex: 2,
  },
  {
    question: "¿Qué es un 'sesgo de confirmación' en la IA?",
    options: ["El modelo confirma que la predicción es correcta", "El modelo tiende a sobreajustarse a los datos", "El modelo busca patrones que confirmen una creencia o hipótesis existente", "El modelo se subajusta a los datos"],
    correctAnswerIndex: 2,
  },
  {
    question: "El 'problema del cuello de botella' en el procesamiento de datos se refiere a:",
    options: ["Un problema con la calidad de los datos", "Una limitación en el rendimiento de un paso del flujo de trabajo de IA", "Un problema de seguridad del modelo", "Un problema de sobreajuste"],
    correctAnswerIndex: 1,
  },
  {
    question: "¿Qué es el 'análisis de la causa raíz' en las pruebas de IA?",
    options: ["Encontrar el origen de un error en el código del modelo", "Determinar la causa de un fallo en el rendimiento del modelo", "Un método para mejorar la velocidad del modelo", "Un método para reducir el tamaño del modelo"],
    correctAnswerIndex: 1,
  },
  {
    question: "La 'prueba de rendimiento' de un modelo de IA mide:",
    options: ["La precisión del modelo", "La velocidad de inferencia y el uso de recursos", "El sesgo del modelo", "La explicabilidad del modelo"],
    correctAnswerIndex: 1,
  },
  {
    question: "Un 'ataque por inversión de modelo' es una amenaza de seguridad que busca:",
    options: ["Robar los datos de entrenamiento originales del modelo", "Hacer que el modelo tome decisiones incorrectas", "Acelerar el entrenamiento del modelo", "Reducir el tamaño del modelo"],
    correctAnswerIndex: 0,
  },
  {
    question: "La 'puntuación de precisión' (precision score) se calcula como:",
    options: ["Verdaderos positivos / (Verdaderos positivos + Falsos positivos)", "Verdaderos positivos / (Verdaderos positivos + Falsos negativos)", "Verdaderos negativos / (Verdaderos negativos + Falsos positivos)", "Verdaderos negativos / (Verdaderos negativos + Falsos negativos)"],
    correctAnswerIndex: 0,
  },
  {
    question: "La 'puntuación de recall' (recall score) se calcula como:",
    options: ["Verdaderos positivos / (Verdaderos positivos + Falsos positivos)", "Verdaderos positivos / (Verdaderos positivos + Falsos negativos)", "Verdaderos negativos / (Verdaderos negativos + Falsos positivos)", "Verdaderos negativos / (Verdaderos negativos + Falsos negativos)"],
    correctAnswerIndex: 1,
  },
  {
    question: "¿Qué es la 'prueba de integridad de datos'?",
    options: ["Garantizar que los datos estén completos y sean precisos", "Probar la velocidad de los datos", "Probar la seguridad de los datos", "Probar el tamaño de los datos"],
    correctAnswerIndex: 0,
  },
  {
    question: "El 'principio de la navaja de Ockham' en la IA sugiere:",
    options: ["Usar los modelos más complejos", "Usar los modelos más simples que expliquen los datos", "Usar los modelos con más parámetros", "Usar los modelos más rápidos"],
    correctAnswerIndex: 1,
  },
  {
    question: "La 'prueba de la interfaz del usuario' (UI) para un sistema de IA se centra en:",
    options: ["El rendimiento del modelo", "Cómo los usuarios interactúan con la parte visual del sistema", "La seguridad del modelo", "El tamaño de los datos"],
    correctAnswerIndex: 1,
  },
  {
    question: "¿Qué es el 'problema de subajuste' (underfitting)?",
    options: ["El modelo es demasiado complejo", "El modelo no captura la complejidad de los datos de entrenamiento", "El modelo se ajusta perfectamente a los datos de entrenamiento", "El modelo tarda mucho en entrenarse"],
    correctAnswerIndex: 1,
  },
  {
    question: "La 'prueba de caja blanca' para la IA incluye:",
    options: ["Probar solo la interfaz del usuario", "Revisar el código del modelo y los algoritmos", "Probar el modelo en un entorno de producción", "Probar el modelo sin datos de entrenamiento"],
    correctAnswerIndex: 1,
  },
  {
    question: "El 'problema de la escasez de datos' es especialmente relevante en:",
    options: ["El aprendizaje supervisado", "El aprendizaje por refuerzo", "El aprendizaje no supervisado", "El aprendizaje con datos sintéticos"],
    correctAnswerIndex: 0,
  },
  {
    question: "La 'prueba de conformidad' de un sistema de IA se centra en:",
    options: ["Asegurar que el modelo sea preciso", "Asegurar que el modelo cumpla con los requisitos especificados", "Asegurar que el modelo sea rápido", "Asegurar que el modelo sea seguro"],
    correctAnswerIndex: 1,
  },
  {
    question: "Un 'sesgo histórico' en un modelo de IA se refiere a:",
    options: ["Un sesgo que surge de datos de entrenamiento antiguos que reflejan prejuicios pasados", "Un sesgo que surge de errores de código", "Un sesgo que surge de la falta de datos", "Un sesgo que surge de datos sintéticos"],
    correctAnswerIndex: 0,
  }
];

const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
};

const App = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  // Function to create a new quiz
  const startNewQuiz = () => {
    // Shuffle the entire question bank and select the first 40 questions
    const shuffledQuestionBank = shuffleArray([...questionBank]);
    const selectedQuestions = shuffledQuestionBank.slice(0, 40);

    // For each selected question, shuffle its options and update the correct answer index
    const preparedQuestions = selectedQuestions.map(q => {
      const originalOptions = [...q.options];
      const originalCorrectAnswer = originalOptions[q.correctAnswerIndex];
      const shuffledOptions = shuffleArray(originalOptions);
      const newCorrectAnswerIndex = shuffledOptions.indexOf(originalCorrectAnswer);
      return {
        ...q,
        options: shuffledOptions,
        correctAnswerIndex: newCorrectAnswerIndex
      };
    });

    setQuizQuestions(preparedQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(40).fill(null));
    setShowResults(false);
    setScore(0);
    setQuizStarted(true);
  };

  const handleAnswerClick = (optionIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleNextClick = () => {
    // Prevent moving to the next question if no option is selected
    if (userAnswers[currentQuestionIndex] === null) {
      alert("Por favor, selecciona una opción para continuar.");
      return;
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults();
      setShowResults(true);
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResults = () => {
    let newScore = 0;
    quizQuestions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswerIndex) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  const passingScore = quizQuestions.length * 0.7;

  // Render content based on the state of the quiz
  const renderQuizContent = () => {
    if (!quizStarted) {
      return (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Simulador de Examen CT-AI</h1>
          <p className="text-lg text-gray-700 mb-6">
            Este simulador te preparará para la certificación. Contiene un banco de más de 100 preguntas, de las cuales se seleccionarán 40 al azar para cada examen.
          </p>
          <button
            onClick={startNewQuiz}
            className="px-8 py-4 text-xl text-white bg-blue-600 rounded-full
                       hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-lg
                       focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Iniciar Examen
          </button>
        </div>
      );
    }

    if (showResults) {
      return (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">¡Examen Finalizado!</h1>
          <div className="bg-blue-50 p-6 rounded-2xl shadow-inner mb-6">
            <p className="text-lg text-gray-700 font-medium">Tu puntuación final es:</p>
            <p className="text-6xl font-extrabold text-blue-700 my-4">{score} / {quizQuestions.length}</p>
            <p className="text-lg text-gray-700">Has respondido correctamente a {score} de 40 preguntas.</p>
          </div>
          {score >= passingScore ? (
            <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-300 flex items-center justify-center">
              <CheckCircleIcon className="w-10 h-10 text-green-500 mr-4" />
              <div className="text-left">
                <p className="text-2xl font-bold text-green-700">¡Felicidades, Aprobaste! 🎉</p>
                <p className="text-gray-700">La puntuación mínima para aprobar es de {passingScore} preguntas (70%).</p>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-300 flex items-center justify-center">
              <XCircleIcon className="w-10 h-10 text-red-500 mr-4" />
              <div className="text-left">
                <p className="text-2xl font-bold text-red-700">No Aprobaste. 🙁</p>
                <p className="text-gray-700">La puntuación mínima para aprobar es de {passingScore} preguntas (70%).</p>
              </div>
            </div>
          )}
          <button
            onClick={startNewQuiz}
            className="mt-8 flex items-center justify-center mx-auto px-6 py-3 text-white bg-blue-600 rounded-full
                       hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-lg
                       focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <ArrowPathIcon className="w-5 h-5 mr-2" />
            Reiniciar Examen
          </button>
        </div>
      );
    }

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isAnswerSelected = userAnswers[currentQuestionIndex] !== null;

    return (
      <>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Simulador de Examen CT-AI</h1>
          <p className="text-lg text-gray-600">Pregunta {currentQuestionIndex + 1} de {quizQuestions.length}</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl mb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            {currentQuestion?.question}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {currentQuestion?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                className={`flex items-center w-full px-5 py-3 text-left rounded-xl transition-all duration-200
                            ${userAnswers[currentQuestionIndex] === index
                              ? 'bg-blue-400 text-white border-blue-400'
                              : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-100 hover:border-blue-400'}
                            focus:outline-none focus:ring-4 focus:ring-blue-200`}
              >
                <span>{option}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePreviousClick}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center px-6 py-3 rounded-full transition-colors duration-200 font-semibold shadow-lg
                        ${currentQuestionIndex === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300'}`}
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Anterior
          </button>
          <button
            onClick={handleNextClick}
            disabled={!isAnswerSelected}
            className={`flex items-center px-6 py-3 rounded-full transition-colors duration-200 font-semibold shadow-lg
                       ${!isAnswerSelected
                         ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                         : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300'}`}
          >
            {currentQuestionIndex === quizQuestions.length - 1 ? 'Finalizar' : 'Siguiente'}
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-sans text-gray-900">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        {renderQuizContent()}
      </div>
    </div>
  );
};

export default App;
