import subprocess
import time
import sys
import os

def main():
    print("Starting backend server (node server.js)...")
    backend = subprocess.Popen(["node", "server.js"])
    
    print("Starting frontend server (npm run dev)...")
    # On Windows, npm commands might need shell=True, but on Mac/Linux shell=False is fine.
    frontend = subprocess.Popen(["npm", "run", "dev"])
    
    try:
        # Keep the script running to keep the subprocesses alive
        while True:
            time.sleep(1)
            
            # Check if any process exited prematurely
            if backend.poll() is not None:
                print("Backend server exited unexpectedly.")
                break
            if frontend.poll() is not None:
                print("Frontend server exited unexpectedly.")
                break
    except KeyboardInterrupt:
        print("\nKeyboard interrupt received. Stopping servers...")
    finally:
        # Clean up processes on exit
        if backend.poll() is None:
            backend.terminate()
        if frontend.poll() is None:
            frontend.terminate()
        print("Servers stopped.")

if __name__ == "__main__":
    # Ensure we are in the correct directory (the script's directory)
    os.chdir(os.path.dirname(os.path.abspath(__file__)) or '.')
    main()
