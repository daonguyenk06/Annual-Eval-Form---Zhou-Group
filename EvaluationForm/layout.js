//Use this for type_of_input to prevent typos
export const inputTypes = {
    counter: "counter",
    number: "number",
    shortText: "text",
    longText: "textarea",
    select: "radio",
    checkbox: "checkbox",
    dropdown: "dropdown"
};

//Form layout
export let evaluation_form_layout = {
    section_0: {
        title: "Research Skills and Knowledge (Weight: 30 points)",
        subsections: {
            subsection_0: {
                title: "Technical Competence (Weight: 10 points):",
                prompts: {
                    0: {
                        prompt: "List the experiments, techniques and equipment you have successfully worked with.",
                        type_of_inputs: inputTypes.textarea,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Highlight any new techniques you have mastered during this period.",
                        type_of_inputs: inputTypes.textarea,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Identify specific achievements or experiments where your technical skills were demonstrated.",
                        type_of_inputs: inputTypes.textarea,
                        row: 5,
                        col: 80
                    },
                    3: {
                        prompt: "List any techniques or equipment you struggled with or found challenging.",
                        type_of_inputs: inputTypes.textarea,
                        row: 5,
                        col: 80
                    },
                    4: {
                        prompt: "Describe any areas where you were unable to meet expectations or had difficulty performing tasks effectively.",
                        type_of_inputs: inputTypes.textarea,
                        row: 5,
                        col: 80
                    },
                    5: {
                        prompt: "Are there specific skills you still need to improve?",
                        type_of_inputs: inputTypes.textarea,
                        row: 5,
                        col: 80
                    },
                    6: {
                        prompt: "Did you have struggles with recording your notebook as expected?",
                        type_of_inputs: inputTypes.textarea,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_1: {
                title: "Data Analysis & Interpretation (Weight: 10 points):",
                prompts: {
                    0: {
                        prompt: "List any data analysis methods you applied successfully to your research.",
                        type_of_inputs: inputTypes.textarea,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Highlight examples of when your interpretation of data led to key insights or outcomes.",
                        type_of_inputs: inputTypes.textarea,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Describe any positive outcomes from using these methods (e.g., clearer results, improved reproducibility, any research products).",
                        type_of_inputs: inputTypes.textarea,
                        row: 5,
                        col: 80
                    },
                    3: {
                        prompt: "Describe any challenges you faced with data analysis or interpreting results.",
                        type_of_inputs: inputTypes.textarea,
                        row: 5,
                        col: 80
                    },
                    4: {
                        prompt: "Were there times when your data analysis led to incorrect conclusions or confusion?",
                        type_of_inputs: inputTypes.textarea,
                        row: 5,
                        col: 80
                    },
                    5: {
                        prompt: "Did you face any difficulties understanding statistical methods or analysis software?",
                        type_of_inputs: inputTypes.textarea,
                        row: 5,
                        col: 80
                    }
                }
            },
            subsection_2: {
                title: "Innovation & Intellectual Contribution (Weight: 10 points):",
                prompts: {
                    0: {
                        prompt: "List any innovative approaches or ideas you have introduced to the project.",
                        type_of_inputs: inputTypes.textarea,
                        row: 5,
                        col: 80
                    },
                    1: {
                        prompt: "Describe instances where your creativity or problem-solving skills led to progress in the research.",
                        type_of_inputs: inputTypes.textarea,
                        row: 5,
                        col: 80
                    },
                    2: {
                        prompt: "Highlight any new concepts or solutions you contributed to the research discussions.",
                        type_of_inputs: inputTypes.textarea,
                        row: 5,
                        col: 80
                    },
                    3: {
                        prompt: "Were there times when your ideas or contributions were not as impactful as you hoped?",
                        type_of_inputs: inputTypes.textarea,
                        row: 5,
                        col: 80
                    },
                    4: {
                        prompt: "Did you struggle to generate new ideas or feel that your contributions were limited?",
                        type_of_inputs: inputTypes.textarea,
                        row: 5,
                        col: 80
                    },
                    5: {
                        prompt: "Were there missed opportunities for applying innovative thinking?",
                        type_of_inputs: inputTypes.textarea,
                        row: 5,
                        col: 80
                    }
                }
            }
        }
    }
};
