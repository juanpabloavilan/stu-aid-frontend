//Acciones para modificar el estado
export const FLASHCARD_ACTIONS = {
  addFlashcard: "@flashcards/addedFlashcard",
  removeFlashcard: "@flashcards/removedFlashcard",
  editFlashcard: "@flashcards/editFlashcard",
  setFlashcards: "@flashcards/setFlashcards",
};

//Reducer function.

export const reducer = (state, action) => {
  switch (action.type) {
    case "@flashcards/addedFlashcard":
      return addFlashcard(action, state);
    case "@flashcards/removedFlashcard":
      return removeFlashcard(action, state);
    case "@flashcards/editFlashcard":
      return editFlashcard(action, state);
    case "@flashcards/setFlashcards":
      return setFlashcards(action);
    default:
      console.log(state, action);
      throw new Error("Invalid action");
  }
};

// Flashcard payload según el tipo
const payloadAccordingType = {
  "front-reverse": {
    front: "",
    back: "",
  },
  "true-false": {
    front: "",
    back: {
      answer: true,
    },
  },
  elaborated: {
    front: "",
    back: {
      answer: "",
    },
  },
};

//Añadir flashcard al estado.
// El action.payload: {subjectId, type}
const addFlashcard = (action, flashcards) => {
  const { subjectId, type } = action.payload;
  return [
    ...flashcards,
    {
      id: flashcards.length + 1,
      pos: flashcards.length + 1,
      subjectId: subjectId,
      type: type,
      status: "active",
      payload: payloadAccordingType[type],
    },
  ];
};

//Eliminar flashcard del estado
// El action.payload: {id, pos}
const removeFlashcard = (action, flashcards) => {
  const { id, pos } = action.payload;
  return flashcards.filter(
    ({ id: currId, pos: currPos }) =>
      !((currId && currId === id) || (currPos && currPos === pos))
  );
};

//Editar flashcard del estado
// El action.payload: {id, pos, front, back}
const editFlashcard = (action, flashcards) => {
  const { id, pos, front, back } = action.payload;
  return flashcards.map((item) => {
    if ((item.id && item.id === id) || (item.pos && item.pos === pos))
      return {
        ...item,
        payload: {
          front,
          back,
        },
      };
    return item;
  });
};

//Setear flashcards.
// El action.payload: {newFlashcards}
const setFlashcards = (action) => {
  const { newFlashcards } = action.payload;
  return newFlashcards;
};
