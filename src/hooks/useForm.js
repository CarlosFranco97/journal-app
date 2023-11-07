import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    
    // const [ formValidation, setFormValidation ] = useState({})
    
    // useEffect( () => {
    //     createValidators()
    //   }, [formState]) //cada vez que cambie el formState, se disparará la funcion createValidators()
      
    useEffect(() => {
        setFormState(initialForm)
    }, [initialForm]);

    
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    };

    
    
    
    const onResetForm = () => setFormState( initialForm );
    
    /*Para realizarlo con useState y useEffect, tambien hay otro metodo con useMemo(), que sería mas simple de realizar. */
    // const createValidators = () => {
       
        //     const formCheckedValues = {};
        
        //    for( const formField in formValidations) {
            //         //desestructuro la funcion y el mensaje de error que cree del formValidations
            //         const [ fn, errorMessage ] = formValidations[formField];
            //         console.log(formCheckedValues[`${formField}Valid`]= fn(formState[formField])) 
            //         formCheckedValues[`${formField}Valid`] = fn(formState[formField]) 
            //         ? null 
            //         : errorMessage;
            
            //   }
            //   setFormValidation( formCheckedValues )
            // }

    const formValidation = useMemo(() => {
        
        const formCheckedValues = {};
        
        for(const formField in formValidations ){
            //
            const [fn, errorMessage] = formValidations[formField];
            
            formCheckedValues[`${formField}Valid`] = fn(formState[formField])
            ? null
            : errorMessage
        };
        return formCheckedValues 
    }, [formState])
    
    const isFormValid = useMemo(() => {
        
        for(const formValue in formValidation) {
          if(formValidation[formValue] !== null) return false 
        }; 

        return true

    }, [formValidation]) 
    
    return {
        ...formState, 
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}