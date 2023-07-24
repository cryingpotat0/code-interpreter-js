type DiscriminatedUnion<K extends PropertyKey, T extends object> = {
    [P in keyof T]: ({ [Q in K]: P } & T[P]) extends infer U ? { [Q in keyof U]: U[Q] } : never
}[keyof T]


export type ProgressStep = DiscriminatedUnion<"name", {
    'Booting': {},
    'Mounting': {}
    'Installing': {}
    'Starting': {}
}>

function CheckMark(): JSX.Element {
    return (
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
    )
}

function Spinner(): JSX.Element {
    return (
        <svg aria-hidden="true" className="w-3.5 h-3.5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
    )
}


export function ProgressBar<T extends object, U extends keyof T>({
    steps,
    currentStep,
    propertyName,
}: {
    currentStep: T[U],
    propertyName: U,
    steps: T[],
}) {


    /*
     *
     *             <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                    <CheckMark />
                    Personal <span className="hidden sm:inline-flex sm:ml-2">Info</span>
                </span>
            </li>
            <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                    <Spinner />
                    Account <span className="hidden sm:inline-flex sm:ml-2">Info</span>
                </span>
            </li>
            <li className="flex items-center">
                <span className="mr-2">3</span>
                Confirmation
            </li>
*/
    const currentStepIndex = steps.findIndex((step) => step[propertyName] === currentStep);
    return (
        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
            {steps.map((step, index) => {

                const lastStep = index === steps.length - 1;
                const stepNumber = index + 1;
                const stepName = step[propertyName];
                const status = (() => {
                    if (index < currentStepIndex) {
                        return 'complete';
                    } else if (index === currentStepIndex) {
                        return 'in-progress';
                    } else {
                        return 'incomplete';
                    }
                })();
                console.log({ stepName, status, lastStep, stepNumber, currentStepIndex });
                return (
                    <ProgressCircle
                        key={stepName}
                        stepName={stepName}
                        status={status}
                        lastStep={lastStep}
                        stepNumber={stepNumber}
                    />
                );
            })}
        </ol>
    );
}


function ProgressCircle({
    stepName,
    status,
    lastStep,
    stepNumber,
}: {
    stepName: string,
    status: 'incomplete' | 'complete' | 'in-progress',
    lastStep: boolean,
    stepNumber: number,
}) {
    // Generic circle with a check mark if filled is true.
    // Otherwise, it is unfilled.

    // If status is in-progress, then the circle is filled with a spinner.
    // Otherwise, it is unfilled.
    // If status is complete, then the circle is filled with a check mark.
    // Otherwise, it is unfilled.
    // If status is incomplete, then the circle is unfilled.
    // Otherwise, it is unfilled.

    let liClassName = "flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700";
    if (lastStep) {
        liClassName = "flex items-center";
    }

    if (status !== 'incomplete') {
        liClassName += ' text-blue-600 dark:text-blue-500'
    } else {
    }

    return (
        <li className={liClassName}>
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                {status === 'in-progress' && <Spinner />}
                {status === 'complete' && <CheckMark />}
                {status === 'incomplete' && <span className="mr-2">{stepNumber}</span>}
                <span className="hidden sm:inline-flex sm:ml-2">{stepName}</span>
            </span>
        </li>
    )



}





