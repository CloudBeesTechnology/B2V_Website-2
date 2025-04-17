'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import profileIcon from '../../../assets/employee/profileIcon.png';

interface PersonalInfoFormData {
  name: string;
  contact: string;
  email: string;
  address: string;
  phone: string;
  proof: string;
  profilePhoto?: File | string | null;
}

// ✅ Zod schema
const personalInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  contact: z.string().min(1, 'Contact is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone number is required'),
  proof: z.string().min(1, 'Proof is required'),
  profilePhoto: z.any().optional(),
});

export const PersonalInfoForm = () => {
  
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues:
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('personalInfo') || '{}')
        : {},
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('personalInfo');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData.profilePhotoUrl) {
          setPreviewImage(parsedData.profilePhotoUrl);
        }
      }
    }
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match('image.*')) {
        alert('Please select an image file');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should be less than 2MB');
        return;
      }

      setSelectedFile(file);
      setValue('profilePhoto', file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data: PersonalInfoFormData) => {
    const dataToStore = {
      ...data,
      profilePhotoUrl: previewImage,
    };
    localStorage.setItem('personalInfo', JSON.stringify(dataToStore));
    router.push('/employeeDetails?tab=educationInfo');
  };

  return (
    <section className="bg-white py-5 px-10 rounded-xl">
      <div>
        <h3 className="text-mediumlite_grey text-[22px]">Personal Info</h3>
      </div>
      <form className="flex justify-between my-5" onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-col gap-4 w-[70%]">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="name" className="text-[15px] text-gray">
                Name<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="name"
                  className="outline-none py-1 w-full"
                  {...register('name')}
                />
              </div>
              {errors.name && (
                <span className="text-red text-sm">{errors.name.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="contact" className="text-[15px] text-gray">
                Contact<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="contact"
                  className="outline-none py-1 w-full"
                  {...register('contact')}
                />
              </div>
              {errors.contact && (
                <span className="text-red text-sm">{errors.contact.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="email" className="text-[15px] text-gray">
                Email ID<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="email"
                  type="email"
                  className="outline-none py-1 w-full"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <span className="text-red text-sm">{errors.email.message}</span>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-5">
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="address" className="text-[15px] text-gray">
                Address<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="address"
                  className="outline-none py-1 w-full"
                  {...register('address')}
                />
              </div>
              {errors.address && (
                <span className="text-red text-sm">{errors.address.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="phone" className="text-[15px] text-gray">
                Phone No<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="phone"
                  type="tel"
                  className="outline-none py-1 w-full"
                  {...register('phone')}
                />
              </div>
              {errors.phone && (
                <span className="text-red text-sm">{errors.phone.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="proof" className="text-[15px] text-gray">
                Proof<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="proof"
                  className="outline-none py-1 w-full"
                  {...register('proof')}
                />
              </div>
              {errors.proof && (
                <span className="text-red text-sm">{errors.proof.message}</span>
              )}
            </div>
          </div>

          <div className="mb-20 pt-10 center">
            <button
              type="submit"
              className="text-[15px] text-white bg-primary px-5 py-3 w-[20%] rounded-md"
            >
              Next
            </button>
          </div>
        </section>

        <section className="w-[30%] flex items-center flex-col gap-4">
          <div
            className="max-w-[150px] w-full h-[150px] rounded-full overflow-hidden cursor-pointer relative border border-gray-200"
            onClick={triggerFileInput}
          >
            {previewImage ? (
              <Image
                src={previewImage}
                alt="Profile preview"
                width={150}
                height={150}
                className="object-cover w-full h-full"
              />
            ) : (
              <Image
                src={profileIcon}
                alt="Default profile"
                width={150}
                height={150}
                className="object-cover w-full h-full"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-white text-sm">Change Photo</span>
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <p className="text-[15px] text-gray">Click to upload</p>
          {selectedFile && (
            <p className="text-sm text-gray-500 text-center">
              Selected: {selectedFile.name}
              <br />
              ({(selectedFile.size / 1024).toFixed(1)} KB)
            </p>
          )}
        </section>
      </form>
    </section>
  );
};
