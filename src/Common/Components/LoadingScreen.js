export const LoadingScreen = ({ text }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-50">
            <div className="flex space-x-2 mb-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            </div>
            <p className="text-gray-500 text-lg font-medium">{ text }</p>
        </div>
    );
}