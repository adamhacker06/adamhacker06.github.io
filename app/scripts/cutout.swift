// Cuts the main subject out of a photo with macOS's built-in subject lifting (the Vision
// framework, macOS 14 or later), crops to it, and saves a PNG with a transparent background.
// Used by cutout.sh for the shelf photos on the Now page.
//
//   swift app/scripts/cutout.swift input.jpg output.png
import AppKit
import CoreImage
import Vision

let args = CommandLine.arguments
guard args.count == 3 else {
  FileHandle.standardError.write("usage: swift cutout.swift input output.png\n".data(using: .utf8)!)
  exit(2)
}

func fail(_ message: String) -> Never {
  FileHandle.standardError.write("cutout: \(message)\n".data(using: .utf8)!)
  exit(1)
}

let input = URL(fileURLWithPath: args[1])
// Respect the photo's EXIF orientation so phone pictures come out upright
guard let source = CIImage(contentsOf: input, options: [.applyOrientationProperty: true]) else { fail("could not read \(args[1])") }

let request = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(ciImage: source)
do { try handler.perform([request]) } catch { fail("Vision failed: \(error)") }
guard let result = request.results?.first, !result.allInstances.isEmpty else { fail("no subject found in \(args[1])") }

// Every subject Vision found, at full size, on a transparent background
let buffer: CVPixelBuffer
do {
  buffer = try result.generateMaskedImage(ofInstances: result.allInstances, from: handler, croppedToInstancesExtent: true)
} catch { fail("could not cut out the subject: \(error)") }

let cut = CIImage(cvPixelBuffer: buffer)
let context = CIContext()
guard let png = context.pngRepresentation(of: cut, format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!) else { fail("could not encode PNG") }
do { try png.write(to: URL(fileURLWithPath: args[2])) } catch { fail("could not write \(args[2])") }
print("cutout: \(args[2]) \(Int(cut.extent.width))x\(Int(cut.extent.height))")
