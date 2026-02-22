"use client";

import { useState } from "react";
import { ImageIcon, CheckCircle, XCircle, RefreshCw } from "lucide-react";

interface ImageUrlInputProps {
  defaultValue?: string;
  name?: string;
}

function convertGoogleDriveUrl(url: string): string {
  // Pattern: https://drive.google.com/file/d/FILE_ID/view?...
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    const fileId = driveMatch[1];
    // Use lh3.googleusercontent.com for direct rendering (no CORS issues)
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  // Pattern: https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (openMatch) {
    return `https://lh3.googleusercontent.com/d/${openMatch[1]}`;
  }

  // Pattern: https://drive.google.com/uc?id=FILE_ID or ?export=view&id=FILE_ID
  const ucMatch = url.match(/drive\.google\.com\/uc\?.*id=([a-zA-Z0-9_-]+)/);
  if (ucMatch) {
    return `https://lh3.googleusercontent.com/d/${ucMatch[1]}`;
  }

  return url;
}

function isGoogleDriveUrl(url: string): boolean {
  return url.includes("drive.google.com");
}

export function ImageUrlInput({ defaultValue = "", name = "imageUrl" }: ImageUrlInputProps) {
  const [rawUrl, setRawUrl] = useState(defaultValue);
  const [previewError, setPreviewError] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);

  const convertedUrl = rawUrl ? convertGoogleDriveUrl(rawUrl.trim()) : "";
  const isDriveUrl = isGoogleDriveUrl(rawUrl);
  const wasConverted = isDriveUrl && convertedUrl !== rawUrl.trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRawUrl(e.target.value);
    setPreviewError(false);
    setPreviewLoaded(false);
  };

  return (
    <div className="space-y-3">
      {/* Hidden input that submits the converted URL */}
      <input type="hidden" name={name} value={convertedUrl} />

      {/* Visible text input */}
      <div className="relative">
        <input
          type="text"
          value={rawUrl}
          onChange={handleChange}
          placeholder="https://drive.google.com/file/d/... or any image URL"
          className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {rawUrl && (
          <button
            type="button"
            onClick={() => { setRawUrl(""); setPreviewError(false); setPreviewLoaded(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-red-500 transition-colors"
          >
            <XCircle size={16} />
          </button>
        )}
      </div>

      {/* Google Drive conversion notice */}
      {wasConverted && (
        <div className="flex items-start gap-2 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-2">
          <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
          <div className="text-xs text-emerald-700 dark:text-emerald-300">
            <p className="font-semibold">Google Drive URL converted ✓</p>
            <p className="text-emerald-600 dark:text-emerald-400 font-mono break-all mt-0.5 opacity-70">
              {convertedUrl}
            </p>
          </div>
        </div>
      )}

      {/* Live preview */}
      {convertedUrl && (
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          <div className="relative bg-neutral-100 dark:bg-neutral-800 min-h-[160px] flex items-center justify-center">
            {!previewLoaded && !previewError && (
              <div className="flex flex-col items-center gap-2 text-neutral-400">
                <RefreshCw size={20} className="animate-spin" />
                <span className="text-xs">Loading preview...</span>
              </div>
            )}

            {previewError ? (
              <div className="flex flex-col items-center gap-2 text-neutral-400 py-8">
                <ImageIcon size={28} />
                <p className="text-xs text-center">
                  Preview failed — image may load correctly in the portfolio.
                  <br />
                  <span className="text-neutral-500">Make sure your Drive file is set to <strong>Anyone with the link</strong>.</span>
                </p>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={convertedUrl}
                alt="Preview"
                onLoad={() => setPreviewLoaded(true)}
                onError={() => { setPreviewError(true); setPreviewLoaded(false); }}
                className={`w-full h-48 object-cover transition-opacity duration-300 ${previewLoaded ? "opacity-100" : "opacity-0 absolute inset-0"}`}
              />
            )}
          </div>
          {previewLoaded && (
            <div className="flex items-center gap-1.5 px-3 py-2 bg-neutral-50 dark:bg-neutral-800/50">
              <CheckCircle size={12} className="text-emerald-500" />
              <p className="text-xs text-neutral-500">Image loaded successfully</p>
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-neutral-400">
        Paste a <strong>Google Drive sharing link</strong> — it will auto-convert. Or use Imgur, Unsplash, or any direct image URL.
      </p>
    </div>
  );
}
