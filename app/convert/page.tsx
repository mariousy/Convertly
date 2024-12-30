export default function Convert() {
    return (
        <section>
            <div>
                <h1 className="text-3xl font-bold mb-4">Convert your files</h1>
                <div className="border-dashed border-2 border-blue-300 rounded-lg p-6 text-center">
                    <input type="file" className="mb-4 block mx-auto"/>
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition">
                        Convert Now
                    </button>
                </div>
            </div>
        </section>
    );
}