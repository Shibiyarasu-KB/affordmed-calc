import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');

    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key;
            if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
                setExpression((prev) => prev + key);
            } else if (key === 'Enter') {
                calculate();
            } else if (key === 'Backspace') {
                clearLast();
            } else if (key === 'c' || key === 'C') {
                clear();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    const calculate = () => {
        try {
            setResult(eval(expression) || "0");
        } catch {
            setResult('Error');
        }
    };

    const clear = () => {
        setExpression('');
        setResult('');
    };

    const clearLast = () => {
        setExpression((prev) => prev.slice(0, -1));
    };

    const handleClick = (value) => {
        setExpression((prev) => prev + value);
    };

    return (
        <div className="calculator">
            <div className="display">
                <div 
                    className="expression" 
                    style={{ '--length': expression.length }}
                >
                    {expression || "0"}
                </div>
                <div className="result">
                    {result || "Result"}
                </div>
            </div>
            <div className="buttons">
                {['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', '0', '.', '/', '(', ')'].map((btn) => (
                    <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
                ))}
                <button onClick={clear}>C</button>
                <button onClick={clearLast}>←</button>
                <button onClick={calculate}>=</button>
            </div>
        </div>
    );
}
