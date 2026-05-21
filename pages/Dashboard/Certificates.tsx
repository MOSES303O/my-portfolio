'use client';

import React, { useState,  } from 'react';
import { Award, Trash2, ImageIcon, Plus } from 'lucide-react';
import Image from 'next/image';

interface Certificate {
  id: number;
  Img: string;
  created_at?: string;
}

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute -inset-0.5 bg-linear-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-500" />
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/12 rounded-2xl h-full overflow-hidden">
      {children}
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="relative">
    <div className="absolute -inset-0.5 bg-linear-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-10" />
    <div className="relative bg-white/5 border border-white/12 rounded-2xl overflow-hidden">
      <div className="w-full aspect-16/11.5 bg-white/5 animate-pulse" />
    </div>
  </div>
);

const CertCard = ({ cert, onDelete }: { cert: Certificate; onDelete: (id: number) => void }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-linear-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-500" />
      
      <div className="relative bg-white/5 border border-white/12 rounded-2xl overflow-hidden">
        {!imgLoaded && <div className="w-full aspect-16/11.5 bg-white/5 animate-pulse" />}
        
        <Image
          src={cert.Img}
          alt="Certificate"
          onLoad={() => setImgLoaded(true)}
          className={`w-full aspect-16/11.5 object-cover group-hover:scale-105 transition-transform duration-500 ${imgLoaded ? 'block' : 'hidden'}`}
        />

        {imgLoaded && (
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <button
              onClick={() => onDelete(cert.id)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm hover:bg-red-500/30 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Certificates() {
  const [certs,setCerts] = useState<Certificate[]>([
    { id: 1, Img: '/jinx.jpg', created_at: new Date().toISOString() },
    { id: 2, Img: '/jinxx.bmp', created_at: new Date().toISOString() },
    { id: 3, Img: '/jinxxx.jpg', created_at: new Date().toISOString() },
  ]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [loading] = useState(true);


  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const uploadImage = async () => {
    if (!file) return;
    setUploading(true);

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    const newCert: Certificate = {
      id: Date.now(),
      Img: preview || '',
      created_at: new Date().toISOString(),
    };

    setCerts(prev => [newCert, ...prev]);
    setFile(null);
    setPreview(null);
    setUploading(false);
  };

  const deleteCert = (id: number) => {
    if (!confirm('Delete this certificate?')) return;
    setCerts(prev => prev.filter(cert => cert.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute -inset-0.5 bg-linear-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-50" />
          <div className="relative w-10 h-10 bg-[#030014] rounded-xl border border-white/15 flex items-center justify-center">
            <Award className="w-5 h-5 text-indigo-400" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Certificates</h1>
          <p className="text-gray-500 text-sm">
            {loading ? 'Loading...' : `${certs.length} certificates`}
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <Card>
        <div className="p-6 space-y-5">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-indigo-400" /> Upload New Certificate
          </h2>

          <label
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
            className={`flex flex-col items-center justify-center w-full min-h-180px rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
              dragOver 
                ? 'border-indigo-400 bg-indigo-500/10' 
                : 'border-white/20 bg-white/5 hover:border-indigo-500/40 hover:bg-white/10'
            }`}
          >
            {preview ? (
              <Image src={preview} alt="preview" className="max-h-44 object-contain rounded-lg" />
            ) : (
              <div className="text-center space-y-3 p-8">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto">
                  <ImageIcon className="w-7 h-7 text-indigo-400" />
                </div>
                <div>
                  <p className="text-white">Drag & drop or click to upload</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP • Max 10MB</p>
                </div>
              </div>
            )}
            <input type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0] || null)} className="hidden" />
          </label>

          {file && (
            <div className="flex items-center justify-between bg-white/5 rounded-xl p-4">
              <p className="text-sm text-gray-300 truncate flex-1">{file.name}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => { setFile(null); setPreview(null); }}
                  className="px-4 py-2 text-sm rounded-xl border border-white/10 hover:bg-white/10"
                >
                  Clear
                </button>
                <button
                  onClick={uploadImage}
                  disabled={uploading}
                  className="px-6 py-2 bg-linear-to-r from-[#6366f1] to-[#a855f7] rounded-xl text-sm font-medium flex items-center gap-2 disabled:opacity-70"
                >
                  {uploading ? 'Uploading...' : 'Upload Certificate'}
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Certificates Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : certs.length === 0 ? (
        <Card className="p-16 text-center">
          <Award className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No certificates yet. Upload your first one!</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certs.map(cert => (
            <CertCard key={cert.id} cert={cert} onDelete={deleteCert} />
          ))}
        </div>
      )}
    </div>
  );
}