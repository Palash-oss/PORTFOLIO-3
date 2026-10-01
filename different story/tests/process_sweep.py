import os
import glob
import numpy as np
from PIL import Image

def analyze_sweep():
    steps_dir = r"c:\Users\Palash\palash-portfolio\different story\tests\sweep_artifacts\desktop_steps"
    img_files = sorted(glob.glob(os.path.join(steps_dir, "step_*.png")))
    
    if not img_files:
        print("No frames found to analyze.")
        return

    print(f"Analyzing {len(img_files)} sampled sweep frames for blankness...")
    
    blank_count = 0
    passed_count = 0
    stdevs = []

    for fpath in img_files:
        im = Image.open(fpath).convert('RGB')
        arr = np.array(im).astype(float)
        
        # Luminance ITU-R BT.709
        lum = arr[:, :, 0] * 0.2126 + arr[:, :, 1] * 0.7152 + arr[:, :, 2] * 0.0722
        
        # Standard deviation of luminance
        stdev = np.std(lum)
        stdevs.append(stdev)
        
        if stdev < 5.0:
            print(f"FAIL: Blank frame detected at {os.path.basename(fpath)} (stdev={stdev:.2f} < 5.0)")
            blank_count += 1
        else:
            passed_count += 1

    print("\n--- RESULTS ---")
    print(f"Total Sampled Frames: {len(img_files)}")
    print(f"Frames Passed (Visible Content): {passed_count}")
    print(f"Blank Frames (stdev < 5.0): {blank_count}")
    print(f"Min Luminance Stdev: {min(stdevs):.2f}")
    print(f"Avg Luminance Stdev: {np.mean(stdevs):.2f}")
    print(f"Max Luminance Stdev: {max(stdevs):.2f}")

    # Generate Contact Sheet
    # 10 columns by N rows
    cols = 10
    rows = int(np.ceil(len(img_files) / cols))
    
    thumb_w, thumb_h = 192, 90 # 10x downscale
    sheet_w = cols * thumb_w
    sheet_h = rows * thumb_h
    
    contact_sheet = Image.new('RGB', (sheet_w, sheet_h), (218, 217, 207))
    
    for idx, fpath in enumerate(img_files):
        im = Image.open(fpath)
        thumb = im.resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
        c = idx % cols
        r = idx // cols
        contact_sheet.paste(thumb, (c * thumb_w, r * thumb_h))
        
    out_sheet_path = r"c:\Users\Palash\palash-portfolio\different story\tests\sweep_artifacts\contact_sheet.png"
    contact_sheet.save(out_sheet_path)
    print(f"Saved contact sheet to {out_sheet_path}")

    if blank_count == 0:
        print("\n>>> ALL FRAMES PASSED ZERO-BLANK CRITERIA! <<<")
    else:
        print(f"\n>>> FAILED: {blank_count} BLANK FRAMES DETECTED <<<")

if __name__ == '__main__':
    analyze_sweep()
