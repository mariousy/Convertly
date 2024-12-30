'use client'

import { useState, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile  } from "@ffmpeg/util";
import Link from "next/link";

const Trimmer = () => {
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [outputURL, setOutputURL] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const ffmpegRef = useRef<FFmpeg | null>(null);

    const initializeFFmpeg = async () => {
        if (!ffmpegRef.current) {
            const ffmpeg = new FFmpeg();
            const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd';

            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            });

            ffmpegRef.current = ffmpeg;
        }
    };

    const handleTrim = async () => {
        if (!videoFile || !startTime || !endTime) {
            alert("Please select a video file and set the start/end times");
            return;
    }

    setIsProcessing(true);

    try {
        // Initialize FFmpeg
        await initializeFFmpeg();

        const ffmpeg = ffmpegRef.current!;
        const inputFileName = videoFile.name;
        const outputFileName = inputFileName.replace(/\.[^/.]+$/, "") + "-trimmed.mp4";

        // Write the video file to the file system
        ffmpeg.writeFile(inputFileName, await fetchFile(videoFile));

        // Run the FFmpeg command to trim
        await ffmpeg.exec([
            "-i", inputFileName,
            "-ss", startTime,
            "-to", endTime,
            "-c", "copy",
            outputFileName
        ]);

        // Read the output file from the file system
        const outputFile = await ffmpeg.readFile(outputFileName);
        const trimmedBlobURL = URL.createObjectURL(new Blob ([outputFile], { type: "video/mp4" }));

        setOutputURL(trimmedBlobURL);
    } catch (error) {
        console.error(error);
        alert("Failed to trim the video");
    } finally {
        setIsProcessing(false);
    }
};

    return (
        <div className="p-6 bg-gray-100 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Trim Your Video</h2>
            <input className="mb-4"
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            />
            <div className="flex space-x-4 mb-4">
                <input className="p-2 border rounded"
                    type="text"
                    placeholder="Start time (HH:MM:SS)"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
            </div>
            <button 
                className={`px-4 py-2 text-white rounded ${isProcessing ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"}`}
                onClick={handleTrim}
                disabled={isProcessing}
            >
                {isProcessing ? "Processing..." : "Trim Video"}
            </button>
            {outputURL && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Trimmed Video:</h3>
                    <video controls src={outputURL} className="w-full"></video>
                    <Link className="mt-2 inline-block px-4 py-2 bg-green-500 text-white rounded"
                        href={outputURL}
                        download="trimmed_video.mp4"
                    > Download Trimmed video 
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Trimmer;