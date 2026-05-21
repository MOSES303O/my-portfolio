'use client';

import React, { useState } from 'react';
import { 
  Plus, Trash2,FolderGit2, X, ImageIcon, 
  ExternalLink,Pencil 
} from 'lucide-react';
import { FaGithub} from "react-icons/fa6";
import Image from 'next/image';

interface Project {
  id: number;
  Title: string;
  Description: string;
  Img?: string;
  TechStack?: string[];
  Features?: string[];
  Link?: string;
  Github?: string;
  created_at?: string;
}
interface ProjectFormData {
  Title: string;
  Description: string;
  TechStack: string;
  Features: string;
  Link: string;
  Github: string;
}

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute -inset-0.5 bg-linear-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-500" />
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/12 rounded-2xl h-full">
      {children}
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="relative">
    <div className="absolute -inset-0.5 bg-linear-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-10" />
    <div className="relative bg-white/5 border border-white/12 rounded-2xl p-4 flex flex-col gap-3">
      <div className="w-full aspect-video bg-white/5 animate-pulse rounded-xl" />
      <div className="h-4 bg-white/5 animate-pulse rounded-lg w-2/3" />
      <div className="h-3 bg-white/5 animate-pulse rounded-lg w-full" />
      <div className="h-3 bg-white/5 animate-pulse rounded-lg w-4/5" />
      <div className="flex gap-1.5 mt-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-5 w-16 bg-white/5 animate-pulse rounded-full" />
        ))}
      </div>
    </div>
  </div>
);
const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) => (
  <div className="space-y-1.5">
    <label className="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
    />
  </div>
);

const ProjectCard = ({ 
  project, 
  onDelete, 
  onEdit 
}: { 
  project: Project; 
  onDelete: (id: number) => void; 
  onEdit: (project: Project) => void;
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Card>
      <div className="p-5 flex flex-col h-full">
        {project.Img && (
          <div className="relative w-full aspect-video rounded-xl mb-4 overflow-hidden bg-white/5 border border-white/10">
            {!imgLoaded && <div className="absolute inset-0 bg-white/5 animate-pulse" />}
            <Image
            width={300}
            height={200}
              src={project.Img}
              alt={project.Title}
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        )}

        <h3 className="font-semibold text-white text-base mb-2 line-clamp-1">
          {project.Title}
        </h3>

        {project.Description && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
            {project.Description}
          </p>
        )}

        {project.TechStack && project.TechStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.TechStack.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 text-xs rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex gap-2">
            {project.Link && (
              <a href={project.Link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.Github && (
              <a href={project.Github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">
                <FaGithub className="w-4 h-4" />
              </a>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(project)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 text-xs transition-all"
            >
              <Pencil className="w-3.5 h-3.5" /> Edit
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Modal = ({ title, onClose, children }: { 
  title: string; 
  onClose: () => void; 
  children: React.ReactNode;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
    <div className="relative w-full max-w-2xl bg-[#0a0a1a] border border-white/12 rounded-3xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <h2 className="font-semibold text-white">{title}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="max-h-[80vh] overflow-y-auto">{children}</div>
    </div>
  </div>
);

const ProjectForm = ({ 
  initial, 
  onSubmit, 
  onCancel, 
  submitLabel = "Save Project", 
  uploading 
}: {
  initial?: Project | null;
  onSubmit: (form: ProjectFormData, file: File | null) => void;
  onCancel: () => void;
  submitLabel?: string;
  uploading: boolean;
}) => {
  const [form, setForm] = useState({
    Title: initial?.Title || "",
    Description: initial?.Description || "",
    TechStack: Array.isArray(initial?.TechStack) ? initial.TechStack.join(", ") : "",
    Features: Array.isArray(initial?.Features) ? initial.Features.join(", ") : "",
    Link: initial?.Link || "",
    Github: initial?.Github || "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(initial?.Img || null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form, file);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-5">
      <InputField label="Project Title" value={form.Title} onChange={(e) => setForm({ ...form, Title: e.target.value })} placeholder="Project Name" required />
      
      <div>
        <label className="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Description</label>
        <textarea
          value={form.Description}
          onChange={(e) => setForm({ ...form, Description: e.target.value })}
          placeholder="Describe the project..."
          rows={4}
          className="w-full mt-1 bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Live URL" value={form.Link} onChange={(e) => setForm({ ...form, Link: e.target.value })} placeholder="https://..." />
        <InputField label="GitHub URL" value={form.Github} onChange={(e) => setForm({ ...form, Github: e.target.value })} placeholder="https://github.com/..." />
      </div>

      <div>
        <label className="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Tech Stack (comma separated)</label>
        <input
          type="text"
          value={form.TechStack}
          onChange={(e) => setForm({ ...form, TechStack: e.target.value })}
          placeholder="React, Tailwind, Node.js"
          className="w-full mt-1 bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Key Features (comma separated)</label>
        <input
          type="text"
          value={form.Features}
          onChange={(e) => setForm({ ...form, Features: e.target.value })}
          placeholder="Authentication, Dark Mode, API Integration"
          className="w-full mt-1 bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Project Image</label>
        <label className="mt-2 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:border-indigo-500/50 transition-colors">
          {preview ? (
            <Image src={preview} alt="preview" className="h-24 object-contain" />
          ) : (
            <div className="flex flex-col items-center">
              <ImageIcon className="w-8 h-8 text-gray-600" />
              <span className="text-xs text-gray-500 mt-2">Click to upload image</span>
            </div>
          )}
          <input type="file" accept="image/*" onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) {
              setFile(f);
              setPreview(URL.createObjectURL(f));
            }
          }} className="hidden" />
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-2xl border border-white/10 hover:bg-white/5">Cancel</button>
        <button 
          type="submit" 
          disabled={uploading}
          className="px-6 py-2.5 bg-linear-to-r from-[#6366f1] to-[#a855f7] rounded-2xl font-medium flex items-center gap-2 disabled:opacity-70"
        >
          {uploading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      Title: "E-Commerce Platform",
      Description: "Modern full-stack e-commerce with admin dashboard and payment integration.",
      Img: "/jinx.jpg",
      TechStack: ["React", "Tailwind", "Node.js"],
      Link: "https://example.com",
      Github: "https://github.com",
    },
    {
      id: 2,
      Title: "TaskFlow - Project Management",
      Description: "Real-time collaborative task management application.",
      Img: "/jinxxx.jpg",
      TechStack: ["Next.js", "Supabase", "Framer Motion"],
      Link: "https://example.com",
      Github: "https://github.com",
    },
  ]);

  const [loading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleCreate = (form: ProjectFormData, file: File | null) => {
    setUploading(true);
    setTimeout(() => {
      const newProject: Project = {
        id: Date.now(),
        Title: form.Title,
        Description: form.Description,
        Img: file ? URL.createObjectURL(file) : undefined,
        TechStack: form.TechStack.split(',').map((s: string) => s.trim()).filter(Boolean),
        Features: form.Features.split(',').map((s: string) => s.trim()).filter(Boolean),
        Link: form.Link,
        Github: form.Github,
      };
      setProjects([newProject, ...projects]);
      setShowCreate(false);
      setUploading(false);
    }, 800);
  };

  const handleEdit = (form:ProjectFormData, file: File | null) => {
    if (!editProject) return;
    setUploading(true);
    setTimeout(() => {
      setProjects(prev => prev.map(p => 
        p.id === editProject.id 
          ? { 
              ...p, 
              Title: form.Title,
              Description: form.Description,
              Img: file ? URL.createObjectURL(file) : p.Img,
              TechStack: form.TechStack.split(',').map((s: string) => s.trim()).filter(Boolean),
              Features: form.Features.split(',').map((s: string) => s.trim()).filter(Boolean),
              Link: form.Link,
              Github: form.Github,
            }
          : p
      ));
      setEditProject(null);
      setUploading(false);
    }, 800);
  };

  const deleteProject = (id: number) => {
    if (!confirm("Delete this project?")) return;
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-linear-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-50" />
            <div className="relative w-9 h-9 bg-[#030014] rounded-xl border border-white/15 flex items-center justify-center">
              <FolderGit2 className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Projects</h1>
            <p className="text-gray-500 text-sm">{projects.length} total</p>
          </div>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-[#6366f1] to-[#a855f7] rounded-2xl font-medium hover:scale-105 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <Modal title="Add New Project" onClose={() => setShowCreate(false)}>
          <ProjectForm 
            onSubmit={handleCreate} 
            onCancel={() => setShowCreate(false)} 
            submitLabel="Create Project" 
            uploading={uploading} 
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {editProject && (
        <Modal title="Edit Project" onClose={() => setEditProject(null)}>
          <ProjectForm 
            initial={editProject} 
            onSubmit={handleEdit} 
            onCancel={() => setEditProject(null)} 
            submitLabel="Update Project" 
            uploading={uploading} 
          />
        </Modal>
      )}

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : projects.length === 0 ? (
        <Card className="p-20 text-center">
          <FolderGit2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No projects yet. Create your first one!</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onDelete={deleteProject} 
              onEdit={setEditProject} 
            />
          ))}
        </div>
      )}
    </div>
  );
}